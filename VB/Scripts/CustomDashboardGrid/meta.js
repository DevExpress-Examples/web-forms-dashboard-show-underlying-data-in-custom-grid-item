var customItemExtensionMeta = {
    bindings: [
        {
            propertyName: 'dimensionsBinding',
            dataItemType: 'Dimension',
            array: true,
            displayName: 'Dimensions',
            placeholder: 'Add Dimension',
            configurePlaceholder: 'Configure Dimension',
            enableInteractivity: true
        },
        {
            propertyName: 'measuresBinding',
            dataItemType: 'Measure',
            array: true,
            displayName: 'Measures',
            placeholder: 'Add Measure',
            configurePlaceholder: 'Configure Measure'
        }
    ],
    interactivity: {
        filter: true,
    },
    groupName: 'common',
    title: 'SourceRowGrid',
    index: 20
};