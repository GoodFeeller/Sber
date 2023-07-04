
import java.sql.*;

import io.debezium.connector.postgresql.PostgresConnectorConfig;

import java.util.List;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.function.Function;

import io.debezium.util.Clock;

import org.apache.kafka.connect.data.Field;
import org.apache.kafka.connect.json.JsonConverter;
import org.apache.kafka.connect.source.SourceRecord;
import io.debezium.embedded.EmbeddedEngine;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.apache.kafka.connect.data.Struct;


import io.debezium.config.Configuration;
public class DBOracleApplication implements Runnable {

    private static final Logger LOGGER = LoggerFactory.getLogger(DBOracleApplication.class);
    private static final String APP_NAME = "debezium";
    private static final String HOSTNAME = "localhost";
    private static final String USER = "postgres";
    private static final String DB_NAME = "java_deb";
    private static final String PASSWORD = "1111";
    private final Configuration config;
    private EmbeddedEngine engine;
    private final JsonConverter valueConverter;

    private Connection connection;
    private Statement statement;
    private static final String HISTORY_URL = "jdbc:postgresql://localhost/java_deb_history";

    public DBOracleApplication() {
        config = Configuration.empty().withSystemProperties(Function.identity()).edit()
                .with(EmbeddedEngine.CONNECTOR_CLASS, "io.debezium.connector.postgresql.PostgresConnector")
                .with(EmbeddedEngine.ENGINE_NAME, APP_NAME)
                .with(PostgresConnectorConfig.TOPIC_PREFIX, APP_NAME)
                .with(PostgresConnectorConfig.HOSTNAME, HOSTNAME)
                .with(PostgresConnectorConfig.DATABASE_NAME, DB_NAME)
                .with(PostgresConnectorConfig.USER, USER)
                .with(PostgresConnectorConfig.PASSWORD, PASSWORD)
                .with(PostgresConnectorConfig.PLUGIN_NAME, "pgoutput")
                .with(EmbeddedEngine.OFFSET_STORAGE, "org.apache.kafka.connect.storage.MemoryOffsetBackingStore")
                .with("schemas.enable", false)
                .build();
        valueConverter = new JsonConverter();
        valueConverter.configure(config.asMap(), false);

        try {
            DriverManager.registerDriver(new org.postgresql.Driver());
            connection = DriverManager.getConnection(HISTORY_URL, USER, PASSWORD);
            statement = connection.createStatement();
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
    }

    public static void main(String[] args) {
        new DBOracleApplication().run();
    }


    @Override
    public void run() {
        engine = EmbeddedEngine.create()
                .using(config)
                .using(this.getClass().getClassLoader())
                .using(Clock.SYSTEM)
                .notifying(this::sendRecord)
                .build();
        ExecutorService executor = Executors.newSingleThreadExecutor();
        executor.execute(engine);

    }

    private void sendRecord(SourceRecord record) {


        if (record.topic().equals(APP_NAME)) {
            LOGGER.error("Schema is missing!");
            return;
        }

        if ( null == record.keySchema() ) {
            System.out.println("KeySchema is missing!");
            return;
        }

        try {

            String messageType = record.sourceOffset().get("messageType").toString();
            String tableName = record.topic().substring(record.topic().lastIndexOf('.') + 1).toString() + "_history";
            Date time = new Date((Long)((Struct) record.value()).get("ts_ms"));

            //get columns
            List<Field> schemaList = record.valueSchema().field("after").schema().fields();
            Struct valuesStruct = ((Struct) record.value()).getStruct("after");
            String[] columns = new String[schemaList.size()];
            for (int i = 0; i < schemaList.size(); i++)
                columns[i] = schemaList.get(i).name();
            String id = ((Struct)record.key()).get("id").toString();

            //create table for history
            String createTableScript = "create table if not exists " + tableName + " ( history_id serial primary key";
            for (String column: columns) {
                createTableScript += ", " + column + " varchar(50)";
            }
            createTableScript += ", start_time varchar(50), end_time varchar(50), action_type varchar(50));";
            statement.execute(createTableScript);


            if (messageType != "DELETE") {

                //get values
                String[] values = new String[schemaList.size()];
                for (int i = 0; i < schemaList.size(); i++)
                    values[i] = valuesStruct.get(columns[i]).toString();

                //insert info
                String newLine = "insert into " + tableName + " ( ";
                for (String elem: columns)
                    newLine += elem + ", ";
                newLine += "start_time, end_time, action_type) values (";
                for (String elem: values)
                    newLine += "'" + elem + "', ";
                newLine += "'" + time + "', 'now',";
                if (messageType == "INSERT")
                    newLine += " 'Добавление');";
                else {
                    //update last line
                    statement.execute("update " + tableName + " set end_time = '" + time + "' where " + columns[0] + " = '" + values[0] + "' and end_time = 'now';");
                    newLine += " 'Обновление');";
                }
                System.out.println(newLine);
                statement.execute(newLine);
            }
            else {
                //update last line
                statement.execute("update " + tableName + " set end_time = '" + time + "' where " + columns[0] + " = '" + id + "' and end_time = 'now';");
                statement.execute("insert into " + tableName + " (" + columns[0] + ", start_time, end_time, action_type) values ('" + id + "', '" + time + "', '" + time + "', 'Удаление');");
            }


        }
        catch (Exception e) {}

    }
}
