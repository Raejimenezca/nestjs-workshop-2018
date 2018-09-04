"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const _ = require("lodash");
const chai_1 = require("chai");
const mongoose = require("mongoose");
const user_1 = require("./models/user");
const car_1 = require("./models/car");
const person_1 = require("./models/person");
const nested_object_1 = require("./models/nested-object");
const genders_1 = require("./enums/genders");
const role_1 = require("./enums/role");
const mongoConnect_1 = require("./utils/mongoConnect");
const utils_1 = require("../utils");
const bson_1 = require("bson");
const assert_1 = require("assert");
describe('Typegoose', () => {
    before(() => mongoConnect_1.initDatabase());
    after(() => mongoConnect_1.closeDatabase());
    it('should create a User with connections', () => __awaiter(this, void 0, void 0, function* () {
        const car = yield car_1.model.create({
            model: 'Tesla',
            price: bson_1.Decimal128.fromString('50123.25'),
        });
        const [trabant, zastava] = yield car_1.model.create([{
                model: 'Trabant',
                price: bson_1.Decimal128.fromString('28189.25'),
            }, {
                model: 'Zastava',
                price: bson_1.Decimal128.fromString('1234.25'),
            }]);
        const user = yield user_1.model.create({
            _id: mongoose.Types.ObjectId(),
            firstName: 'John',
            lastName: 'Doe',
            age: 20,
            uniqueId: 'john-doe-20',
            gender: genders_1.Genders.MALE,
            role: role_1.Role.User,
            job: {
                title: 'Developer',
                position: 'Lead',
                jobType: {
                    salery: 5000,
                    field: "IT",
                },
            },
            car: car.id,
            languages: ['english', 'typescript'],
            previousJobs: [{
                    title: 'Janitor',
                }, {
                    title: 'Manager',
                }],
            previousCars: [trabant.id, zastava.id],
        });
        {
            const foundUser = yield user_1.model
                .findById(user.id)
                .populate('car previousCars')
                .exec();
            chai_1.expect(foundUser).to.have.property('nick', 'Nothing');
            chai_1.expect(foundUser).to.have.property('firstName', 'John');
            chai_1.expect(foundUser).to.have.property('lastName', 'Doe');
            chai_1.expect(foundUser).to.have.property('uniqueId', 'john-doe-20');
            chai_1.expect(foundUser).to.have.property('age', 20);
            chai_1.expect(foundUser).to.have.property('gender', genders_1.Genders.MALE);
            chai_1.expect(foundUser).to.have.property('role', role_1.Role.User);
            chai_1.expect(foundUser).to.have.property('job');
            chai_1.expect(foundUser).to.have.property('car');
            chai_1.expect(foundUser).to.have.property('languages').to.have.length(2).to.include('english').to.include('typescript');
            chai_1.expect(foundUser.job).to.have.property('title', 'Developer');
            chai_1.expect(foundUser.job).to.have.property('position', 'Lead');
            chai_1.expect(foundUser.job).to.have.property('startedAt').to.be.instanceof(Date);
            chai_1.expect(foundUser.job.jobType).to.not.have.property('_id');
            chai_1.expect(foundUser.job.jobType).to.have.property('salery', 5000);
            chai_1.expect(foundUser.job.jobType).to.have.property('field', 'IT');
            chai_1.expect(foundUser.job.jobType).to.have.property('salery').to.be.a('number');
            chai_1.expect(foundUser.car).to.have.property('model', 'Tesla');
            chai_1.expect(foundUser).to.have.property('previousJobs').to.have.length(2);
            chai_1.expect(foundUser).to.have.property('fullName', 'John Doe');
            const [janitor, manager] = _.sortBy(foundUser.previousJobs, ((job) => job.title));
            chai_1.expect(janitor).to.have.property('title', 'Janitor');
            chai_1.expect(manager).to.have.property('title', 'Manager');
            chai_1.expect(foundUser).to.have.property('previousCars').to.have.length(2);
            const [foundTrabant, foundZastava] = _.sortBy(foundUser.previousCars, (previousCar) => previousCar.model);
            chai_1.expect(foundTrabant).to.have.property('model', 'Trabant');
            chai_1.expect(foundTrabant).to.have.property('isSedan', true);
            chai_1.expect(foundZastava).to.have.property('model', 'Zastava');
            chai_1.expect(foundZastava).to.have.property('isSedan', undefined);
            foundUser.fullName = 'Sherlock Holmes';
            chai_1.expect(foundUser).to.have.property('firstName', 'Sherlock');
            chai_1.expect(foundUser).to.have.property('lastName', 'Holmes');
            yield foundUser.incrementAge();
            chai_1.expect(foundUser).to.have.property('age', 21);
        }
        {
            const foundUser = yield user_1.model.findByAge(21);
            chai_1.expect(foundUser).to.have.property('firstName', 'Sherlock');
            chai_1.expect(foundUser).to.have.property('lastName', 'Holmes');
        }
        {
            const createdUser = yield user_1.model.findOrCreate({
                firstName: 'Jane',
                lastName: 'Doe',
                gender: genders_1.Genders.FEMALE,
            });
            chai_1.expect(createdUser).to.be.ok;
            chai_1.expect(createdUser).to.have.property('created');
            chai_1.expect(createdUser.created).to.be.true;
            chai_1.expect(createdUser).to.have.property('doc');
            chai_1.expect(createdUser.doc).to.have.property('firstName', 'Jane');
            const foundUser = yield user_1.model.findOrCreate({
                firstName: 'Jane',
                lastName: 'Doe',
            });
            chai_1.expect(foundUser).to.be.ok;
            chai_1.expect(foundUser).to.have.property('created');
            chai_1.expect(foundUser.created).to.be.false;
            chai_1.expect(foundUser).to.have.property('doc');
            chai_1.expect(foundUser.doc).to.have.property('firstName', 'Jane');
            try {
                const cloneUser = yield user_1.model.create({
                    _id: mongoose.Types.ObjectId(),
                    firstName: 'John',
                    lastName: 'Doe',
                    age: 20,
                    gender: genders_1.Genders.MALE,
                    uniqueId: 'john-doe-20',
                });
            }
            catch (err) {
                chai_1.expect(err).to.have.property('name', 'MongoError');
                chai_1.expect(err).to.have.property('code', 11000);
            }
        }
    }));
    it('should add a language and job using instance methods', () => __awaiter(this, void 0, void 0, function* () {
        const user = yield user_1.model.create({
            firstName: 'harry',
            lastName: 'potter',
            gender: genders_1.Genders.MALE,
            languages: ['english'],
            uniqueId: 'unique-id',
        });
        yield user.addJob({ position: 'Dark Wizzard', title: 'Archmage' });
        yield user.addJob();
        const savedUser = yield user.addLanguage();
        chai_1.expect(savedUser.languages).to.include('Hungarian');
        chai_1.expect(savedUser.previousJobs.length).to.be.above(0);
        _.map(savedUser.previousJobs, (prevJob) => {
            chai_1.expect(prevJob.startedAt).to.be.ok;
        });
    }));
});
describe('getClassForDocument()', () => {
    before(() => mongoConnect_1.initDatabase());
    it('should return correct class type for document', () => __awaiter(this, void 0, void 0, function* () {
        const car = yield car_1.model.create({
            model: 'Tesla',
            price: bson_1.Decimal128.fromString('50123.25'),
        });
        const carReflectedType = utils_1.getClassForDocument(car);
        chai_1.expect(carReflectedType).to.equals(car_1.Car);
        const user = yield user_1.model.create({
            _id: mongoose.Types.ObjectId(),
            firstName: 'John2',
            lastName: 'Doe2',
            gender: genders_1.Genders.MALE,
            languages: ['english2', 'typescript2'],
        });
        const userReflectedType = utils_1.getClassForDocument(user);
        chai_1.expect(userReflectedType).to.equals(user_1.User);
        // assert negative to be sure (false positive)
        chai_1.expect(carReflectedType).to.not.equals(user_1.User);
        chai_1.expect(userReflectedType).to.not.equals(car_1.Car);
    }));
    it('should use inherited schema', () => __awaiter(this, void 0, void 0, function* () {
        let user = yield person_1.model.create({
            email: 'my@email.com',
        });
        const car = yield car_1.model.create({
            model: 'Tesla',
            price: bson_1.Decimal128.fromString('50123.25'),
        });
        yield user.addCar(car);
        user = yield person_1.model.findById(user.id).populate('cars');
        // verify properties
        chai_1.expect(user).to.have.property('createdAt');
        chai_1.expect(user).to.have.property('email', 'my@email.com');
        chai_1.expect(user.cars.length).to.be.above(0);
        _.map(user.cars, (currentCar) => {
            chai_1.expect(currentCar.model).to.be.ok;
        });
        // verify methods
        chai_1.expect(user.getClassName()).to.equals('Person');
        chai_1.expect(person_1.model.getStaticName()).to.equals('Person');
    }));
    it('Should store nested address', () => __awaiter(this, void 0, void 0, function* () {
        const personInput = new nested_object_1.PersonNested();
        personInput.name = 'Person, Some';
        personInput.address = new nested_object_1.AddressNested('A Street 1');
        personInput.moreAddresses = [
            new nested_object_1.AddressNested('A Street 2'),
            new nested_object_1.AddressNested('A Street 3'),
        ];
        const person = yield nested_object_1.PersonNestedModel.create(personInput);
        chai_1.expect(person).is.not.undefined;
        chai_1.expect(person.name).equals('Person, Some');
        chai_1.expect(person.address).is.not.undefined;
        chai_1.expect(person.address.street).equals('A Street 1');
        chai_1.expect(person.moreAddresses).is.not.undefined;
        chai_1.expect(person.moreAddresses.length).equals(2);
        chai_1.expect(person.moreAddresses[0].street).equals('A Street 2');
        chai_1.expect(person.moreAddresses[1].street).equals('A Street 3');
    }));
    it('Should validate Decimal128', () => __awaiter(this, void 0, void 0, function* () {
        try {
            yield car_1.model.create({
                model: 'Tesla',
                price: 'NO DECIMAL',
            });
            assert_1.fail('Validation must fail.');
        }
        catch (e) {
            chai_1.expect(e).to.be.a.instanceof(mongoose.Error.ValidationError);
        }
        const car = yield car_1.model.create({
            model: 'Tesla',
            price: bson_1.Decimal128.fromString('123.45'),
        });
        const foundCar = yield car_1.model.findById(car._id).exec();
        chai_1.expect(foundCar.price).to.be.a.instanceof(bson_1.Decimal128);
        chai_1.expect(foundCar.price.toString()).to.eq('123.45');
    }));
});
//# sourceMappingURL=index.test.js.map