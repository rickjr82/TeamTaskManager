using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TeamTaskManager.Models
{
    public partial class Log
    {
        public Log()
        {
            LogTime = DateTime.Now;
        }

        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int LogId { get; set; }
        public System.DateTime LogTime { get; set; }
        public string LogType { get; set; }
        public string LogArea { get; set; }
        public string Message { get; set; }
        public string Severity { get; set; }
    }
}