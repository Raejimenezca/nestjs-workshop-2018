"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const typegoose_1 = require("../../typegoose");
class JobType {
}
__decorate([
    typegoose_1.prop({ required: true }),
    __metadata("design:type", String)
], JobType.prototype, "field", void 0);
__decorate([
    typegoose_1.prop({ required: true }),
    __metadata("design:type", Number)
], JobType.prototype, "salery", void 0);
exports.JobType = JobType;
class Job {
}
__decorate([
    typegoose_1.prop(),
    __metadata("design:type", String)
], Job.prototype, "title", void 0);
__decorate([
    typegoose_1.prop(),
    __metadata("design:type", String)
], Job.prototype, "position", void 0);
__decorate([
    typegoose_1.prop({ required: true, default: Date.now }),
    __metadata("design:type", Date)
], Job.prototype, "startedAt", void 0);
__decorate([
    typegoose_1.prop({ _id: false }),
    __metadata("design:type", JobType)
], Job.prototype, "jobType", void 0);
exports.Job = Job;
//# sourceMappingURL=job.js.map