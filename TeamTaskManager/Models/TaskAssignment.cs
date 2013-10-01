using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TeamTaskManager.Models
{
    public class TaskAssignment
    {
        public int PlayerId {get;set;}
        public Player Player { get; set; }
        public int TaskId { get; set; }
        public Task Task { get; set; }
        public int GameId { get; set; }
        public Game Game { get; set; }
    }
}