using System;
using System.Collections.Generic;

namespace TeamTaskManager.Models
{
    public partial class Game
    {
        public Game()
        {
        }

        public System.DateTime Time { get; set; }
        public int Id { get; set; }
        public string Location { get; set; }
        public string Opponent { get; set; }
        public int TeamId { get; set; }
        public virtual Team Team { get; set; }
        public virtual List<TaskAssignment> TaskAssignments { get; set; }
    }
}
