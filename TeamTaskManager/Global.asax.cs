using System;
using System.Configuration;
using System.Security.Cryptography.X509Certificates;
using System.Web.Http;
using System.Web.Mvc;
using System.Web.Optimization;
using System.Web.Routing;
using System.Threading;
using Quartz;
using Quartz.Impl;
using WebMatrix.WebData;
using TeamTaskManager.Models;
namespace TeamTaskManager
{
    // Note: For instructions on enabling IIS6 or IIS7 classic mode, 
    // visit http://go.microsoft.com/?LinkId=9394801

    public class MvcApplication : System.Web.HttpApplication
    {
        private static SimpleMembershipInitializer _initializer;
        private static object _initializerLock = new object();
        private static bool _isInitialized;

        protected void Application_Start()
        {
            AreaRegistration.RegisterAllAreas();

            WebApiConfig.Register(GlobalConfiguration.Configuration);
            FilterConfig.RegisterGlobalFilters(GlobalFilters.Filters);
            RouteConfig.RegisterRoutes(RouteTable.Routes);
            BundleConfig.RegisterBundles(BundleTable.Bundles);
            AuthConfig.RegisterAuth();

            LazyInitializer.EnsureInitialized(ref _initializer, ref _isInitialized, ref _initializerLock);
            var reader = new AppSettingsReader();
            var sendEmails = (bool)reader.GetValue("email:Enabled", typeof(bool));

            if (sendEmails)
            {

                // construct a scheduler factory
                ISchedulerFactory schedFact = new StdSchedulerFactory();

                // get a scheduler
                IScheduler sched = schedFact.GetScheduler();
                sched.Start();

                // construct job info
                IJobDetail jobDetail = JobBuilder.Create<EmailJob>().WithIdentity("emailJob", "emailGroup").Build();
                // fire every hour
                ITrigger trigger = TriggerBuilder.Create()
                    .WithIdentity("emailTrigger", "emailGroup")
                    .WithSimpleSchedule(x => x.WithIntervalInSeconds(60).RepeatForever())
                    .Build();
                sched.ScheduleJob(jobDetail, trigger);
            }
        }
        public class SimpleMembershipInitializer
        {
            public SimpleMembershipInitializer()
            {
                using (var context = new MyTeamTrackerContext())
                  //  context.UserProfiles.Find(1);

                if (!WebSecurity.Initialized)
                    WebSecurity.InitializeDatabaseConnection("context", "UserProfile", "UserId", "UserName", autoCreateTables: true);
            }
        }
    }
}