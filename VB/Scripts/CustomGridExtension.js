window.MyDashboardGrid = (function () {
	var Dashboard = DevExpress.Dashboard;
	var dxDataGrid = DevExpress.ui.dxDataGrid;

	// Defines a custom item icon.
	var svgIcon = '<svg id= "customItemIcon" viewBox="0 0 24 24" ><path stroke="#42f48f" fill="#42f48f" d="M12 2 L2 22 L22 22 Z" /></svg>';

	// Defines a custom item meta description.
	var customItemExtensionMeta = {
		bindings: [{
			propertyName: 'dimensionsBinding',
			dataItemType: 'Dimension',
			array: true,
			displayName: 'Dimensions',
			placeholder: 'Add Dimension',
			configurePlaceholder: 'Configure Dimension',
			enableInteractivity: true
		}, {
			propertyName: 'measuresBinding',
			dataItemType: 'Measure',
			array: true,
			displayName: 'Measures',
			placeholder: 'Add Measure',
			configurePlaceholder: 'Configure Measure'
		}],
		interactivity: {
			filter: true,
		},
		groupName: 'common',
		title: 'SourceRowGrid',
		index: 20
	};
	
	// Specifies an item viewer behavior.
	class Viewer extends Dashboard.CustomItemViewer {
		constructor(dashboardControl, model, container, options) {
			super(model, container, options);
			this.viewerApiExtension = dashboardControl.findExtension('viewer-api');
		}
		renderContent($element, changeExisting) {
			//Dimensions and Measures
			var requestedDataMembers = [];
			var bindings = this.getBindingValue('dimensionsBinding').concat(this.getBindingValue('measuresBinding'));
			bindings.forEach(function (binding) {
				requestedDataMembers.push(binding.displayName());
			});
				
			//Create a div with a grid
			var div = document.createElement('div');
			var dataGrid = new dxDataGrid(div, { height: '100%' });
				
			//Add a div with a grid to a container
			var container = $element.jquery ? $element[0] : $element;
			while(container.firstChild)
				container.removeChild(container.firstChild);
			container.appendChild(div);
				
			//Prepare parameters
			var requestParameters = {
				DataMembers: requestedDataMembers,
				AxisPoints: []
			};
				
			//Request underlying data and fill a data source
			this.viewerApiExtension && this.viewerApiExtension.requestUnderlyingData(this.getName(), requestParameters, function (data) {
				var underlyingData = [];
				var dataMembers = data.getDataMembers();
				for (var i = 0; i < data.getRowCount() ; i++) {
					var dataTableRow = {};
					dataMembers.forEach(function(dataMember) {
						dataTableRow[dataMember] = data.getRowValue(i, dataMember);
					});
						
					underlyingData.push(dataTableRow);
				}
				//Set a datasource to a grid
				dataGrid.option('dataSource', underlyingData);
			});
		}
	}
	// Creates function that implements a custom item extension.	
	class MyDashboardGrid {
		constructor(dashboardControl) {
			Dashboard.ResourceManager.registerIcon(svgIcon);
			
			this.name = 'MyDashboardGrid';
			this.metaData = customItemExtensionMeta;
			this.dashboardControl = dashboardControl;
		}
		createViewerItem = (model, $element, content) => {
			return new Viewer(this.dashboardControl, model, $element, content);
		}
	}
	
	return MyDashboardGrid;
})();