﻿using System.Web.Optimization;

namespace TeamTaskManager
{
    public class BundleConfig
    {
        // For more information on Bundling, visit http://go.microsoft.com/fwlink/?LinkId=254725
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
                        "~/Scripts/jquery-{version}.js"));

            bundles.Add(new ScriptBundle("~/bundles/jqueryui").Include(
                        "~/Scripts/jquery-ui-{version}.js"));

            bundles.Add(new ScriptBundle("~/bundles/jqueryval").Include(
                        "~/Scripts/jquery.unobtrusive*",
                        "~/Scripts/jquery.validate*"));

            bundles.Add(new ScriptBundle("~/bundles/angular").Include(
                        "~/Scripts/angular.js",
                        "~/Scripts/angular-animate.js",
                        "~/Scripts/angular-route.js"));
            bundles.Add(new ScriptBundle("~/bundles/ajaxlogin").Include(
            "~/app/ajaxlogin.js"));
            bundles.Add(new ScriptBundle("~/bundles/utilities").Include(
                "~/Scripts/underscore.js"));

            bundles.Add(new ScriptBundle("~/bundles/breeze").Include(
                        "~/Scripts/q.js",
                        "~/Scripts/breeze.debug.js",
                        "~/Scripts/breeze.min.js",
                        "~/Scripts/breeze.savequeuing.js"));

            bundles.Add(new ScriptBundle("~/bundles/teamTaskManager").Include(
           "~/Scripts/ui-bootstrap-tpls-0.6.0.js", 
           "~/Scripts/toastr.js",            
           "~/app/teamTaskManager.main.js", // must be first, well until I include another bundle
                "~/app/js/controllers/*.js",
                "~/app/js/services/*.js"
                ));

            // Use the development version of Modernizr to develop with and learn from. Then, when you're
            // ready for production, use the build tool at http://modernizr.com to pick only the tests you need.
            bundles.Add(new ScriptBundle("~/bundles/modernizr").Include(
                        "~/Scripts/modernizr-*"));

            bundles.Add(new StyleBundle("~/Content/css").Include(
                "~/Content/bootstrap/bootstrap.css",
                "~/Content/Site.css",
                        "~/Content/toastr.css"));

            bundles.Add(new StyleBundle("~/Content/themes/base/css").Include(
                        "~/Content/themes/base/jquery.ui.core.css",
                        "~/Content/themes/base/jquery.ui.resizable.css",
                        "~/Content/themes/base/jquery.ui.selectable.css",
                        "~/Content/themes/base/jquery.ui.accordion.css",
                        "~/Content/themes/base/jquery.ui.autocomplete.css",
                        "~/Content/themes/base/jquery.ui.button.css",
                        "~/Content/themes/base/jquery.ui.dialog.css",
                        "~/Content/themes/base/jquery.ui.slider.css",
                        "~/Content/themes/base/jquery.ui.tabs.css",
                        "~/Content/themes/base/jquery.ui.datepicker.css",
                        "~/Content/themes/base/jquery.ui.progressbar.css",
                        "~/Content/themes/base/jquery.ui.theme.css"));
        }
    }
}