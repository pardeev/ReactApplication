var Newtonsoft;
(function (Newtonsoft) {
    var ValidatorViewModel = /** @class */ (function () {
        function ValidatorViewModel(tokenHeader, state) {
            var _this = this;
            this.schemaText = ko.observable();
            this.jsonText = ko.observable();
            this.loadingSchema = ko.observable();
            this.savingPage = ko.observable();
            this.savingPageFailedMessage = ko.observable();
            this.savingPageSuccessMessage = ko.observable();
            this.savedUrl = ko.observable();
            this.schemaFailedMessage = ko.observable();
            this.jsonFailedMessage = ko.observable();
            this.jsonSuccessMessage = ko.observable();
            this.schemaValidationErrors = ko.observableArray();
            this.schemaStoreCatalog = ko.observableArray();
            this.selectedSchemaName = ko.observable();
            this.updateSchemaLint = function () { };
            this.updateJsonLint = function () { };
            this.tokenHeader = ko.observable();
            this.failedDetailMessage = ko.observable();
            this.failedMessage = ko.computed(function () {
                var f1 = _this.schemaFailedMessage();
                var f2 = _this.jsonFailedMessage();
                return (f1 || f2);
            });
            this.successMessage = ko.computed(function () {
                return _this.jsonSuccessMessage();
            });
            this.handleParseErrorResult = function (result) {
                var lintAnnotations = [];
                if (result.jsonParseError) {
                    _this.buildLintAnnotations(lintAnnotations, [result.jsonParseError]);
                    _this.updateJsonLint(lintAnnotations);
                    _this.jsonFailedMessage("Error parsing JSON");
                    _this.failedDetailMessage(result.jsonParseError.message);
                }
                if (result.schemaParseError) {
                    _this.buildLintAnnotations(lintAnnotations, [result.schemaParseError]);
                    _this.updateSchemaLint(lintAnnotations);
                    _this.schemaFailedMessage("Error parsing schema");
                    _this.failedDetailMessage(result.schemaParseError.message);
                }
            };
            this.handleValidateResult = function (result) {
                // schema
                // don't display lint errors for resolved schemas
                var baseSchemaErrors = result.schemaErrors.filter(function (e) { return e.schemaBaseUri === null; });
                var lintAnnotations = [];
                _this.buildLintAnnotations(lintAnnotations, baseSchemaErrors, "warning");
                _this.updateSchemaLint(lintAnnotations);
                // validation
                for (var j = 0; j < result.validationErrors.length; j++) {
                    var validationError = result.validationErrors[j];
                    _this.schemaValidationErrors.push(validationError);
                }
                lintAnnotations = [];
                _this.buildLintAnnotations(lintAnnotations, result.validationErrors);
                _this.updateJsonLint(lintAnnotations);
                if (result.valid) {
                    _this.jsonSuccessMessage("No errors found. JSON validates against the schema");
                }
                else {
                    _this.jsonFailedMessage("Found " + lintAnnotations.length + " error(s)");
                }
            };
            this.formatSchema = function () {
                _this.format(_this.schemaText(), function (result) {
                    _this.updateSchemaLint([]);
                    _this.schemaText(result.json);
                }, function (result) {
                    _this.updateSchemaLint(result);
                    _this.schemaFailedMessage("Error parsing schema");
                });
            };
            this.formatJson = function () {
                _this.format(_this.jsonText(), function (result) {
                    _this.updateJsonLint([]);
                    _this.jsonText(result.json);
                }, function (result) {
                    _this.updateJsonLint(result);
                    _this.jsonFailedMessage("Error parsing JSON");
                });
            };
            this.savePage = function () {
                var params = {
                    schemaText: _this.schemaText(),
                    selectedSchemaName: _this.selectedSchemaName(),
                    jsonText: _this.jsonText()
                };
                var json = JSON.stringify(params);
                _this.savingPageSuccessMessage(null);
                _this.savingPageFailedMessage(null);
                _this.savingPage(true);
                $.ajax("/api/jsonschema/savepage", {
                    data: json,
                    type: "POST",
                    contentType: "application/json",
                    headers: {
                        'X-Csrf-Token': _this.tokenHeader()
                    }
                })
                    .done(function (result) {
                    var url = window.location.protocol + "//" + window.location.host + "/s/" + result.id;
                    _this.savedUrl(url);
                })
                    .fail(function (xhr) {
                    var error = xhr.responseJSON;
                    if (error) {
                        _this.savingPageFailedMessage(error.message);
                    }
                    else {
                        _this.savingPageFailedMessage("Unexpected error occurred");
                    }
                })
                    .always(function () {
                    _this.savingPage(false);
                });
            };
            this.schemaLint = function (value, updateLinting, passOptions, cm) {
                _this.updateSchemaLint = function (annotations) {
                    updateLinting(cm, annotations);
                };
            };
            this.jsonLint = function (value, updateLinting, passOptions, cm) {
                _this.updateJsonLint = function (annotations) {
                    updateLinting(cm, annotations);
                };
            };
            this.tokenHeader(tokenHeader);
            this.validation = ko.validatedObservable(this);
            var schemaText = state.SchemaText || this.tryGetStorageItem("schemaText") || ValidatorViewModel.defaultSchemaText;
            var selectedSchemaName = state.SelectedSchemaName || this.tryGetStorageItem("selectedSchemaName");
            var jsonText = state.JsonText || this.tryGetStorageItem("jsonText") || ValidatorViewModel.defaultJsonText;
            if (state.Success) {
                var message = state.Message;
                if (!message && this.tryGetStorageItem("schemaText")) {
                    message = "Previous local schema loaded";
                }
                this.savingPageSuccessMessage(message);
            }
            else {
                this.savingPageFailedMessage(state.Message);
                schemaText = ValidatorViewModel.defaultSchemaText;
                jsonText = ValidatorViewModel.defaultJsonText;
                selectedSchemaName = "";
            }
            this.schemaText(schemaText);
            this.jsonText(jsonText);
            this.schemaText.subscribe(function () {
                _this.resetState();
                if (!_this.loadingSchema()) {
                    _this.selectedSchemaName("custom");
                }
            });
            this.jsonText.subscribe(function () {
                _this.resetState();
            });
            $.ajax("/api/jsonschemastore/catalog", {
                type: "GET",
                contentType: "application/json",
                headers: {
                    'X-Csrf-Token': this.tokenHeader()
                }
            })
                .done(function (data) {
                for (var i = 0; i < data.schemas.length; i++) {
                    var s = data.schemas[i];
                    _this.schemaStoreCatalog.push(s);
                }
                if (selectedSchemaName) {
                    _this.selectedSchemaName(selectedSchemaName);
                }
            })
                .always(function () {
                _this.selectedSchemaName.subscribe(function (v) {
                    _this.trySetStorageItem("selectedSchemaName", v);
                    if (v === "custom") {
                        return;
                    }
                    if (v) {
                        _this.loadingSchema(true);
                        $.ajax({
                            url: v,
                            type: "GET",
                            dataType: "text",
                            headers: {
                                'X-Csrf-Token': _this.tokenHeader()
                            }
                        })
                            .done(function (data) {
                            _this.schemaText(data);
                        })
                            .always(function () {
                            _this.loadingSchema(false);
                        });
                    }
                    else {
                        _this.schemaText(ValidatorViewModel.defaultSchemaText);
                    }
                });
            });
        }
        ValidatorViewModel.prototype.resetState = function () {
            this.savedUrl(null);
            this.savingPageFailedMessage(null);
            this.savingPageSuccessMessage(null);
        };
        ValidatorViewModel.prototype.tryGetStorageItem = function (key) {
            try {
                return localStorage.getItem(key);
            }
            catch (e) {
                return null;
            }
        };
        ValidatorViewModel.prototype.trySetStorageItem = function (key, data) {
            try {
                localStorage.setItem(key, data);
            }
            catch (e) {
            }
        };
        ValidatorViewModel.prototype.initialize = function () {
            var _this = this;
            ko.computed(function () {
                var params = { schema: _this.schemaText(), json: _this.jsonText() };
                _this.trySetStorageItem("schemaText", _this.schemaText());
                _this.trySetStorageItem("jsonText", _this.jsonText());
                _this.schemaFailedMessage("");
                _this.jsonFailedMessage("");
                _this.jsonSuccessMessage("");
                _this.failedDetailMessage("");
                _this.schemaValidationErrors.removeAll();
                _this.updateSchemaLint([]);
                _this.updateJsonLint([]);
                if (!_this.validation.isValid()) {
                    return;
                }
                var json = JSON.stringify(params);
                $.ajax("/api/jsonschema/validate", {
                    data: json,
                    type: "POST",
                    contentType: "application/json",
                    headers: {
                        'X-Csrf-Token': _this.tokenHeader()
                    }
                })
                    .done(function (result) {
                    if (result.schemaParseError || result.jsonParseError) {
                        _this.handleParseErrorResult(result);
                    }
                    else {
                        _this.handleValidateResult(result);
                    }
                })
                    .fail(function (xhr) {
                    var error = xhr.responseJSON;
                    if (error && error.message) {
                        _this.jsonFailedMessage(error.message);
                    }
                    else {
                        _this.jsonFailedMessage("Unexpected error occurred while validating JSON");
                    }
                })
                    .always(function () {
                    if (_this.validationComplete) {
                        _this.validationComplete();
                    }
                });
            }).extend({ throttle: 400 });
        };
        ValidatorViewModel.prototype.format = function (jsonText, setResult, setFailure) {
            var _this = this;
            var params = { json: jsonText };
            var json = JSON.stringify(params);
            $.ajax("/api/jsonschema/format", {
                data: json,
                type: "POST",
                contentType: "application/json",
                headers: {
                    'X-Csrf-Token': this.tokenHeader()
                }
            })
                .done(function (result) {
                if (result.json) {
                    setResult(result);
                }
                else {
                    var lintAnnotations = [];
                    _this.buildLintAnnotations(lintAnnotations, [result.parseError]);
                    setFailure(lintAnnotations);
                    _this.failedDetailMessage(result.parseError.message);
                }
            })
                .fail(function (xhr) {
                var error = xhr.responseJSON;
                if (error) {
                    _this.failedDetailMessage(error.message);
                }
                else {
                    _this.jsonFailedMessage("Unexpected error occurred while formatting JSON");
                }
            });
        };
        ValidatorViewModel.prototype.buildSchemaPath = function (data) {
            var path = data.schemaId;
            if (!path) {
                return null;
            }
            if (path.indexOf('#') === -1) {
                path += '#';
            }
            path += '/' + data.errorType;
            return path;
        };
        ValidatorViewModel.prototype.buildLintAnnotations = function (lintAnnotations, validationErrors, severity) {
            if (severity === void 0) { severity = "error"; }
            for (var i = 0; i < validationErrors.length; i++) {
                var error = validationErrors[i];
                lintAnnotations.push({
                    from: CodeMirror.Pos(error.lineNumber - 1, error.linePosition - 1),
                    message: error.message,
                    severity: severity
                });
                if (error.childErrors) {
                    this.buildLintAnnotations(lintAnnotations, error.childErrors, severity);
                }
            }
        };
        ValidatorViewModel.defaultSchemaText = "{\n\t\"$schema\": \"https://json-schema.org/draft/2019-09/schema\"\n\}";
        ValidatorViewModel.defaultJsonText = "{\n\t\n\}";
        return ValidatorViewModel;
    }());
    Newtonsoft.ValidatorViewModel = ValidatorViewModel;
})(Newtonsoft || (Newtonsoft = {}));
//# sourceMappingURL=ValidatorViewModel.js.map