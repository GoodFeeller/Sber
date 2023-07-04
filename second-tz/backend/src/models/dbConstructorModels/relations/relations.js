import Consequence from "../consequenceModel.js"
import Effort from "../effortModel.js"
import Reason from "../reasonModel.js"
import Repayment from "../repaymentModel.js"
import Event from "../eventModel.js"
import User from "../userModel.js"
// const EventStateModel = require("../eventStateModel")
import BusinessLine from "../dictModels/businessLine.js"
import Client from "../dictModels/client.js"
import ConsequenceType from "../dictModels/consequenceType.js"
import Cpr from "../dictModels/cpr.js"
import Currency from "../dictModels/currency.js"
import DefenceLine from "../dictModels/defenceLine.js"
import FunctBlock from "../dictModels/functBlock.js"
import OrgStructure from "../dictModels/functBlock.js"
import OtherRisk from "../dictModels/otherRisk.js"
import Process from "../dictModels/process.js"
import ReasonType from "../dictModels/reasonType.js"
import RepaymentType from "../dictModels/repaymentType.js"
import RepaymentTypeGroup from "../dictModels/repaymentTypeGroup.js"
import Researcher from "../dictModels/researcher.js"
import RiskType from "../dictModels/riskType.js"
import SourceType from "../dictModels/sourceType.js"
import Status from "../dictModels/status.js"
import FunctionalBlock from "../dictModels/functBlock.js";
import status from "../dictModels/status.js";


//Event model association
Event.hasMany(User)
User.belongsTo(Event)

Event.hasMany(Reason)
Reason.belongsTo(Event)

Event.hasMany(Effort)
Effort.belongsTo(Event)

Event.hasMany(Consequence)
Consequence.belongsTo(Event)

Status.hasMany(Status)
Event.belongsTo(Status)

Client.hasMany(Event)
Event.belongsTo(Client)

DefenceLine.hasMany(Event)
Event.belongsTo(DefenceLine)

Researcher.hasMany(Event)
Event.belongsTo(Researcher)

OrgStructure.hasMany(Event)
Event.belongsTo(OrgStructure)


// reason model association
Process.hasMany(Reason)
Reason.belongsTo(Process)

FunctBlock.hasMany(Reason)
Reason.belongsTo(FunctBlock)

RiskType.hasMany(Reason)
Reason.belongsTo(RiskType)

OrgStructure.hasMany(Reason)
Reason.belongsTo(OrgStructure)

ReasonType.hasMany(Reason)
Reason.belongsTo(ReasonType)


// consequence model association
BusinessLine.hasMany(Consequence)
Consequence.belongsTo(BusinessLine)

FunctBlock.hasMany(Consequence)
Consequence.belongsTo(FunctBlock)

RiskType.hasMany(Consequence)
Consequence.belongsTo(RiskType)

OrgStructure.hasMany(Consequence)
Consequence.belongsTo(OrgStructure)

Cpr.hasMany(Consequence)
Consequence.belongsTo(Cpr)

SourceType.hasMany(Consequence)
Consequence.belongsTo(SourceType)

ConsequenceType.hasMany(Consequence)
Consequence.belongsTo(ConsequenceType)

Currency.hasMany(Consequence)
Consequence.belongsTo(Currency)

Consequence.hasMany(Repayment)
Repayment.belongsTo(Consequence)

OtherRisk.belongsToMany(Consequence,{through:'OtherRiskModel_ConsequenceModel'})
Consequence.belongsToMany(OtherRisk,{through:'OtherRiskModel_ConsequenceModel'})


//repayment model association
Currency.hasMany(Repayment)
Repayment.belongsTo(Currency)

RepaymentType.hasMany(Repayment)
Repayment.belongsTo(RepaymentType)

RepaymentTypeGroup.hasMany(Repayment)
Repayment.belongsTo(RepaymentTypeGroup)



// effort model association
OrgStructure.hasMany(Effort)
Effort.belongsTo(OrgStructure)

Status.hasMany(Effort)
Effort.belongsTo(Status)











