<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Default.aspx.cs" Inherits="WebApplication18.Default" %>

<!DOCTYPE html>

<html>
<head runat="server">
    <title></title>
    <script type="text/javascript">
        function onBeforeRender(s, e) {
            var dashboardControl = s.GetDashboardControl();
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