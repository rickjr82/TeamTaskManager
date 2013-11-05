using System;
using System.Collections.Generic;
using System.Configuration;
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
            var log = new Log
            {
                LogArea = "Email",
                LogType = "Start Sending",
                Message = "Initiating Send",
                Severity = "Info"
            };
            dbContext.Logs.Add(log);
            dbContext.SaveChanges();
            try
            {

                var from = new MailAddress("rickjr82@gmail.com");
                var taskAssignments = GetTaskAssignmentsForNotification(dbContext);
                var users = taskAssignments.Select(x => x.Player.User);
                var subject = "Notifications For Upcoming Games";

                var html = "";
                var text = "";

                foreach (var user in users)
                {
                    var to = new MailAddress[] {new MailAddress(user.Email)};
                    html = "<p>Hello " + user.FirstName + ",</p><br/><p>Your Tasks for the upcoming game are:</p><ul>"
                    text = "Hello " + user.FirstName + ",\n Your Tasks for the upcoming game are:"
                    var userTasks = taskAssignments.Where(x => x.Player.UserId == user.UserId);

                    foreach (var task in userTasks)
                    {
                        html += "<li>" + task.Task.Name + " - " + task.Task.Description + "</li>";
                        text += task.Task.Name + " - " + task.Task.Description + "\n"
                    }
                    SendEmail(to, from, html, text);
                }


                log = new Log {LogArea = "Email", LogType = "Success", Message = "Completed Send", Severity = "Info"};
                dbContext.Logs.Add(log);
                dbContext.SaveChanges();
            }
            catch (Exception ex)
            {
                log = new Log {LogArea = "Email", LogType = "Failure", Message = ex.Message, Severity = "High"};
                dbContext.Logs.Add(log);
                dbContext.SaveChanges();
            }
        }

        private s 

        private IQueryable<TaskAssignment> GetTaskAssignmentsForNotification(MyTeamTrackerContext context)
        {
            var taskAssignments =
                context.TaskAssignments.Include(x => x.User).Where(
                    x =>
                        x.Status == null && x.Game.Time.AddDays(-1).CompareTo(DateTime.Now) > 0 &&
                        x.Game.Time.CompareTo(DateTime.Now) < 0);
            return taskAssignments;
        }

        public void SendEmail(MailAddress to, MailAddress from, string subject, string html, string text)
        {
            var reader = new AppSettingsReader();
            var fakeEmails = (bool) reader.GetValue("email:SendFake", typeof (bool));

            if (fakeEmails)
            {
                log = new Log
                {
                    LogArea = "Email",
                    LogType = "Fake",
                    Message = "to=" + to", from="+from+", subect="+subject+", text="+text+", html"+html,
                    Severity = "Fake"
                };
                dbContext.Logs.Add(log);
                dbContext.SaveChanges();
            }
            else
            {
                var userName = (string) reader.GetValue("email:UserName", typeof (bool));
                var password = (string) reader.GetValue("email:Password", typeof (bool));
                SendGrid myMessage = SendGrid.GetInstance(from, to, null, null, subject, html, text);
                var credentials = new NetworkCredential(userName, password);
                var transportSMTP = SMTP.GetInstance(credentials);
                transportSMTP.Deliver(myMessage);
            }
        }
    }
}