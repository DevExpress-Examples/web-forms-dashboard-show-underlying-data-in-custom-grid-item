<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Default.aspx.cs" Inherits="WebApplication18.Default" %>

<%@ Register Assembly="DevExpress.Dashboard.v20.1.Web.WebForms, Version=20.1.3.0, Culture=neutral, PublicKeyToken=b88d1754d700e49a" Namespace="DevExpress.DashboardWeb" TagPrefix="dx" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>

    <script type="text/javascript">
        function onBeforeRender(s, e) {
            var dashboardControl = s.getDashboardControl();
            dashboardControl.registerExtension(new MyDashboardGrid(dashboardControl));
        }
    </script>

</head>
<body>
    <form id="form1" runat="server">
        <div>
            <dx:ASPxDashboard ID="ASPxDashboardDesigner1" ClientInstanceName="webDashboard" runat="server" UseDashboardConfigurator="true">
                <ClientSideEvents BeforeRender="onBeforeRender" />
            </dx:ASPxDashboard>

            <script src="Scripts/CustomGridExtension.js"></script>
        </div>
    </form>
</body>
</html>
