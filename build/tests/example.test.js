'use strict';

var _mochaSteps = require('mocha-steps');

var _builder = require('../builder');

var _builder2 = _interopRequireDefault(_builder);

var _LoginPage = require('../pages/LoginPage');

var _LoginPage2 = _interopRequireDefault(_LoginPage);

var _chai = require('chai');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//import puppeteer from 'puppeteer'
describe('Mocha steps demo', function () {
    var page = void 0;
    var loginPage = void 0;

    before(async function () {
        page = await _builder2.default.build("Desktop");
        loginPage = await new _LoginPage2.default(page);
    });

    after(async function () {
        await page.close();
    });

    (0, _mochaSteps.step)('should load webapp security homepage', async function () {
        await page.goto("http://zero.webappsecurity.com/index.html");
        (0, _chai.expect)((await page.isElementVisible("#signin_button"))).to.be.true;
    });

    (0, _mochaSteps.step)('should display login form', async function () {
        await page.waitAndClick('#signin_button');
        (0, _chai.expect)((await page.isElementVisible("#login_form"))).to.be.true;
        (0, _chai.expect)((await page.isElementVisible("#signin_button"))).to.be.false;
    });

    (0, _mochaSteps.step)("should login to application", async function () {
        await loginPage.login("username", "password");
        (0, _chai.expect)((await page.isElementVisible(".nav-tabs"))).to.be.true;
    });
});