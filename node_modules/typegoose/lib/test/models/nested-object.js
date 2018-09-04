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
const tg = require("../../typegoose");
class AddressNested {
    constructor(street) {
        this.street = street;
    }
}
exports.AddressNested = AddressNested;
class PersonNested extends tg.Typegoose {
    constructor() {
        super(...arguments);
        this.moreAddresses = [];
    }
}
__decorate([
    tg.prop(),
    __metadata("design:type", String)
], PersonNested.prototype, "name", void 0);
__decorate([
    tg.prop(),
    __metadata("design:type", AddressNested)
], PersonNested.prototype, "address", void 0);
__decorate([
    tg.prop(),
    __metadata("design:type", Array)
], PersonNested.prototype, "moreAddresses", void 0);
exports.PersonNested = PersonNested;
exports.PersonNestedModel = new PersonNested().getModelForClass(PersonNested);
//# sourceMappingURL=nested-object.js.map