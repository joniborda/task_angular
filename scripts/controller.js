angular
	.module('Task')
	.controller("MainController", function($scope, $resource) {

	})
	.controller("TaskNewController", function() {

        var vm = this;
        var tabIndex = 4;

        vm.addTab = function()
        {
            vm.tabs.push(
            {
                heading: 'Tab ' + tabIndex,
                content: 'Tab ' + tabIndex + ' content'
            });

            ++tabIndex;
        };
        vm.removeFirstTab = function()
        {
            removeTab(0);
        };
        
        vm.removeTab = function(_idx)
        {
            if (vm.tabs.length > _idx)
            {
                vm.tabs.splice(_idx, 1);
            }
        };

        vm.activeTab = 1;
        vm.tabIsDisabled = false;
        vm.tabs = [
        {
            heading: 'Tab 1',
            content: 'Tab 1 content'
        },
        {
            heading: 'Tab 2',
            content: 'Tab 2 content'
        },
        {
            heading: 'Tab 3',
            content: 'Tab 3 content'
        }];
	});
