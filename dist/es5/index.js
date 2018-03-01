"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(require("@ionic/cloud"));
var rxjs_1 = require("rxjs");
var core_1 = require("@angular/core");
var cloud_1 = require("@ionic/cloud");
var Rx = /** @class */ (function () {
    function Rx(emitter) {
        this.emitter = emitter;
    }
    return Rx;
}());
exports.Rx = Rx;
var PushRx = /** @class */ (function (_super) {
    __extends(PushRx, _super);
    function PushRx() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PushRx.prototype.notification = function () {
        var _this = this;
        return rxjs_1.Observable.fromEventPattern(function (h) {
            return _this.emitter.on('push:notification', function (data) {
                return h(data.message);
            });
        }, function (_) {
            // https://github.com/ReactiveX/rxjs/issues/1900
            // this.emitter.off(signal);
        });
    };
    return PushRx;
}(Rx));
exports.PushRx = PushRx;
var FacebookAuth = /** @class */ (function (_super) {
    __extends(FacebookAuth, _super);
    function FacebookAuth() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return FacebookAuth;
}(cloud_1.FacebookAuth));
exports.FacebookAuth = FacebookAuth;
var GoogleAuth = /** @class */ (function (_super) {
    __extends(GoogleAuth, _super);
    function GoogleAuth() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return GoogleAuth;
}(cloud_1.GoogleAuth));
exports.GoogleAuth = GoogleAuth;
var Auth = /** @class */ (function (_super) {
    __extends(Auth, _super);
    function Auth() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Auth;
}(cloud_1.Auth));
exports.Auth = Auth;
var Client = /** @class */ (function (_super) {
    __extends(Client, _super);
    function Client() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Client;
}(cloud_1.Client));
exports.Client = Client;
var Config = /** @class */ (function (_super) {
    __extends(Config, _super);
    function Config() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Config;
}(cloud_1.Config));
exports.Config = Config;
var Deploy = /** @class */ (function (_super) {
    __extends(Deploy, _super);
    function Deploy() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Deploy;
}(cloud_1.Deploy));
exports.Deploy = Deploy;
var DIContainer = /** @class */ (function (_super) {
    __extends(DIContainer, _super);
    function DIContainer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return DIContainer;
}(cloud_1.DIContainer));
exports.DIContainer = DIContainer;
var Insights = /** @class */ (function (_super) {
    __extends(Insights, _super);
    function Insights() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Insights;
}(cloud_1.Insights));
exports.Insights = Insights;
var Push = /** @class */ (function (_super) {
    __extends(Push, _super);
    function Push() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Push;
}(cloud_1.Push));
exports.Push = Push;
var User = /** @class */ (function (_super) {
    __extends(User, _super);
    function User() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return User;
}(cloud_1.User));
exports.User = User;
exports.CloudSettingsToken = new core_1.InjectionToken('CloudSettings');
function provideContainer(settings) {
    var container = new DIContainer();
    container.config.register(settings);
    container.core.init();
    container.cordova.bootstrap();
    return container;
}
exports.provideContainer = provideContainer;
function provideConfig(container) {
    return container.config;
}
exports.provideConfig = provideConfig;
function provideAuth(container) {
    return container.auth;
}
exports.provideAuth = provideAuth;
function provideClient(container) {
    return container.client;
}
exports.provideClient = provideClient;
function provideDeploy(container) {
    return container.deploy;
}
exports.provideDeploy = provideDeploy;
function provideUser(container) {
    return container.singleUserService.current();
}
exports.provideUser = provideUser;
function providePush(container) {
    var push = container.push;
    push.rx = new PushRx(container.eventEmitter);
    return push;
}
exports.providePush = providePush;
function provideFacebookAuth(container) {
    return container.facebookAuth;
}
exports.provideFacebookAuth = provideFacebookAuth;
function provideGoogleAuth(container) {
    return container.googleAuth;
}
exports.provideGoogleAuth = provideGoogleAuth;
var CloudModule = /** @class */ (function () {
    function CloudModule() {
    }
    CloudModule.forRoot = function (settings) {
        return {
            ngModule: CloudModule,
            providers: [
                { provide: exports.CloudSettingsToken, useValue: settings },
                { provide: DIContainer, useFactory: provideContainer, deps: [exports.CloudSettingsToken] },
                { provide: Auth, useFactory: provideAuth, deps: [DIContainer] },
                { provide: Client, useFactory: provideClient, deps: [DIContainer] },
                { provide: Config, useFactory: provideConfig, deps: [DIContainer] },
                { provide: Deploy, useFactory: provideDeploy, deps: [DIContainer] },
                { provide: Push, useFactory: providePush, deps: [DIContainer] },
                { provide: User, useFactory: provideUser, deps: [DIContainer] },
                { provide: FacebookAuth, useFactory: provideFacebookAuth, deps: [DIContainer] },
                { provide: GoogleAuth, useFactory: provideGoogleAuth, deps: [DIContainer] }
            ]
        };
    };
    return CloudModule;
}());
exports.CloudModule = CloudModule;
//# sourceMappingURL=index.js.map