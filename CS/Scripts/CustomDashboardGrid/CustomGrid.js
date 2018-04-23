function registerCustomDashboardGrid(dashboardControl) {
    //dashboardControl.registerIcon(MY_EXTENSION_ICON);

    return {
        name: "MyDashboardGrid",
        metaData: customItemExtensionMeta,

        createViewerItem: function (model, $element, content) {
            return new viewer(model, $element, content);
        }
    }
};