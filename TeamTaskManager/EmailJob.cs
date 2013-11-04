using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Quartz;
using TeamTaskManager.Models;
using System.Net;
using System.Net.Mail;
using SendGridMail;
using SendGridMail.Transport;

namespace TeamTaskManager
{
    public class EmailJob : IJob
    {
        public EmailJob()
        {
        }

        public void Execute(IJobExecutionContext context)
        {

            var dbContext = new MyTeamTrackerContext();
            var log = new Log { LogArea = "Email", LogType = "Start Sending", Message = "Initiating Send", Severity = "Info" };
            dbContext.Logs.Add(log);
            dbContext.SaveChanges();
            try
            {

                var from = new MailAddress("rickjr82@gmail.com");
                var taskAssignments = GetTaskAssignmentsForNotification(dbContext);
                var users= taskAssignments.Select(x=>x.Player.User);
                var subject = "Notifications For Upcoming Games";
                
                var html = "";
                var text="";s
                s
                foreach(var user in users)
                {
                    var to = new MailAddress[] {new MailAddress(user.Email)};
                     html="<p>Hello "+user.FirstName+",</p>"
                     text="Hello "+user.FirstName+",\n"
                    var userTasks=taskAssignments.Where(x=>x.Player.UserId==user.UserId);
                    foreach (var task in userTasks)
                    {
                        
                    }
                }
                
                // Create an email, passing in the the eight properties as arguments.
                SendGrid myMessage = SendGrid.GetInstance(from, to, to, to, subject, html, text);
                var credentials = new NetworkCredential("azure_5b07d2f6abf18718ec02b13cc62088fd@azure.com", "omy86md7");

                // Create an SMTP transport for sending email.
                var transportSMTP = SMTP.GetInstance(credentials);

                // Send the email.
                transportSMTP.Deliver(myMessage);
                log = new Log { LogArea = "Email", LogType = "Start Sending", Message = "Completed Send", Severity = "Info" };
                dbContext.Logs.Add(log);
                dbContext.SaveChanges();
            }
            catch (Exception ex)
            {
                log = new Log { LogArea = "Email", LogType = "Failure", Message = ex.Message, Severity = "High" };
                dbContext.Logs.Add(log);
                dbContext.SaveChanges();
            }
        }s

        private IQueryable<TaskAssignment> GetTaskAssignmentsForNotification(MyTeamTrackerContext context)
        {
            var taskAssignments =
                context.TaskAssignments.Include(x=>x.User).Where(
                    x => x.Status == null && x.Game.Time.AddDays(-1).CompareTo(DateTime.Now)>0 && x.Game.Time.CompareTo(DateTime.Now) < 0);
            return taskAssignments;
        }
    }
}
s