var viewer = (function (_base) {
    __extends(viewer, _base);
    function viewer(model, $container, options) {
        _base.call(this, model, $container, options);
        this.model = model;
    }

    viewer.prototype._getGridId = function () {
        return 'custom-grid-' + this.getName();
    };

    viewer.prototype.getGridContainer = function () {
        return $('#' + this._getGridId());
    };

    viewer.prototype.renderContent = function ($element, changeExisting) {
        var columns = [];
        var dataSource = [];
        var _this = this;
        var gridId = this._getGridId();


        //Dimensions and Measures
        var bindings = this.getBindingValue('dimensionsBinding').concat(this.getBindingValue('measuresBinding'));
        bindings.forEach(function (binding) {
            columns.push(binding.displayName());
        });

        //Create a div with a grid
        var gridDiv = $('<div id=' + gridId + '><div/>');
        var dataGrid = gridDiv.dxDataGrid({
            columns: columns,
            height: "100%"
        }).dxDataGrid('instance');
        //Prepare parameters
        var requestParameters = {
            DataMembers: columns,
            AxisPoints: []
        };

        //Request underlying data and fill a data source
        webDashboard.RequestUnderlyingData(_this.getName(), requestParameters, function (data) {
            var underlyingData = [];
            dataMembers = data.GetDataMembers();
            for (var i = 0; i < data.GetRowCount() ; i++) {
                var dataTableRow = {};
                $.each(dataMembers, function (_, dataMember) {
                    dataTableRow[dataMember] = data.GetRowValue(i, dataMember);
                });

                underlyingData.push(dataTableRow);
            }
            //Set a datasource to a grid
            dataGrid.option("dataSource", underlyingData);
        });
        //Add a div with a grid to a container
        $element.empty();
        $element.append(gridDiv);
    };

    return viewer;
}(DevExpress.JS.Dashboard.customViewerItem));