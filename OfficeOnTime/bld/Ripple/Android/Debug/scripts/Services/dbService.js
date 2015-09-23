'use strict';
ootApp.service('dbService', function ($rootScope) {

    this.createDB = function () {
        var db = window.openDatabase("ootDB", "1.0", "OOT DB", 200000);
        db.transaction(this.populateDB, this.errorCallback);
    };

    this.populateDB = function (tx) {
        //tx.executeSql('DROP TABLE USER');
        tx.executeSql('CREATE TABLE IF NOT EXISTS USER (ID unique, Name, Email, Mobile)');
    };

    this.getUser = function () {
        var db = window.openDatabase("ootDB", "1.0", "OOT DB", 200000);
        db.transaction(this.executeGetQuery, this.errorCallback);
    };

    this.executeGetQuery = function (tx) {
        tx.executeSql('SELECT * FROM USER', [], function (tx, results) {
            $rootScope.$emit('getResultSet', { resultSet: results.rows });
        }, function (err) {
            alert(err.code);
        });
    };

    this.createUser = function () {
        var db = window.openDatabase("ootDB", "1.0", "OOT DB", 200000);
        db.transaction(this.executeInsertQuery, this.errorCallback);
    };

    this.executeInsertQuery = function (tx) {
        var insertSQL = 'INSERT INTO USER (ID, Name, Email, Mobile) VALUES (' + $rootScope.globalUser.ID + ',' + ' " ' + $rootScope.globalUser.Name + ' " ' + ',' + ' " ' + $rootScope.globalUser.Email + ' " ' + ',' + $rootScope.globalUser.Mobile + ')';
        tx.executeSql(insertSQL);
    };

    this.updateUser = function () {
        var db = window.openDatabase("ootDB", "1.0", "OOT DB", 200000);
        db.transaction(this.executeUpdateQuery, this.errorCallback);
    };

    this.executeUpdateQuery = function (tx) {
        var updateSQL = 'UPDATE USER SET Name =' + ' " ' +$rootScope.globalUser.Name+ ' " ' + ', Email =' + ' " ' +$rootScope.globalUser.Email+ ' " ' + ',Mobile =' +$rootScope.globalUser.Mobile+ ' WHERE ID =' +  $rootScope.globalUser.ID;
        tx.executeSql(updateSQL);
    };

    this.errorCallback = function (err) {
        alert(err.code);
    };
});