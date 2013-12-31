angular.module('mean.machines').controller('MachinesController', ['$scope', '$routeParams', '$location', '$modal',
        'Global', 'Machines', function ($scope, $routeParams, $location, $modal, Global, Machines) {
    $scope.global = Global;
    $scope.machines = {};
//    $scope.select = {
//        selectROn: true,
//        selectFOn: true,
//        selectROff: false,
//        selectFOff: false
//    };
    $scope.useLog = {};
    $scope.machineId = {};

    $scope.checked = false; // button switch default

    /*
    * machines data init
    * */
    $scope.find = function() {
        Machines.query(function(pcStatuses) {
            $scope.machines = pcStatuses;
        });

    };

    /*
    * button enroll
    * */
    $scope.enroll = function (machineId) {

        $scope.machineId = machineId;

        var modalInstance = $modal.open({
            templateUrl: 'views/machines/enroll.html',
            controller: function ($scope, Machines, $modalInstance, useLog, machineId) {
//                $scope.select = select;

                $scope.machineId = machineId;

                $scope.useLog = new Machines({
                    name: this.name,
                    sno: this.sno,
                    tel: this.tel,
                    machineId: null,
                    status: null

                });
                $scope.useLog.machineId = machineId;
                $scope.useLog.status = 'using';

                $scope.ok = function () {

                    $scope.useLog.$save(function() {
                        Machines.query(function(pcStatuses) {
                            $scope.machines = pcStatuses;
                        });
                    });

                    $modalInstance.close(
//                        $scope.select.selectROn = false,
//                        $scope.select.selectROff = true
                    );
                };

                $scope.cancel = function () {
                    $modalInstance.dismiss('cancel');
                };

            },
            resolve: {
//                select:function () {
//                    return $scope.select;
//                },
                useLog:function () {
                    return $scope.useLog;
                },
                machineId:function () {
                    return $scope.machineId;
                }
            }
        });

        modalInstance.result.then(function (select) {
//            $scope.select = select;
        });
    };

    /*
     * button away
     * */
    $scope.away = function (machineId) {

        $scope.machineId = machineId;

        var modalInstance = $modal.open({
            templateUrl: 'views/machines/away.html',
            controller: function ($scope, Machines, $modalInstance, useLog, machineId) {

                $scope.machineId = machineId;

                $scope.useLog = new Machines({
                    others: this.note,
                    machineId: null
                });
                $scope.useLog.machineId = machineId;

                $scope.ok = function () {

                    $scope.useLog.$update(function() {
                        Machines.query(function(pcStatuses) {
                            $scope.machines = pcStatuses;
                        });
                    });

                    $modalInstance.close();
                };

                $scope.cancel = function () {
                    $modalInstance.dismiss('cancel');
                };

            },
            resolve: {
                useLog:function () {
                    return $scope.useLog;
                },
                machineId:function () {
                    return $scope.machineId;
                }
            }
        });

        modalInstance.result.then(function () {
        });
    };

    /*
    * button fixOn
    * */
    $scope.fixOn = function () {
        var modalInstance = $modal.open({
            templateUrl: 'views/machines/fixOn.html',
            controller: function ($scope, $modalInstance) {
                $scope.ok = function () {
                    $modalInstance.close();
                };

                $scope.cancel = function () {
                    $modalInstance.dismiss('cancel');
                };
            },
            resolve: {
            }
        });

        modalInstance.result.then(function () {
        });
    };

    /*
     * button fixOff
     * */
    $scope.fixOff = function () {
        var modalInstance = $modal.open({
            templateUrl: 'views/machines/fixOff.html',
            controller: function ($scope, $modalInstance) {
                $scope.ok = function () {
                    $modalInstance.close();
                };

                $scope.cancel = function () {
                    $modalInstance.dismiss('cancel');
                };
            },
            resolve: {
            }
        });

        modalInstance.result.then(function () {
        });
    };

}]);

