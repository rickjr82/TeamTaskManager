using System;
using System.Collections.Generic;

namespace TeamTaskManager.Models
{
    public partial class Game
    {
        public Game()
        {
            this.TeamGameTasks = new List<TeamGameTask>();
        }

        public System.DateTime Time { get; set; }
        public int Id { get; set; }
        public string Location { get; set; }
        public string Opponent { get; set; }
        public virtual ICollection<TeamGameTask> TeamGameTasks { get; set; }
        public virtual Team Team { get; set; }
    }
}
