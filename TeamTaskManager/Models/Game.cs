using System;
using System.Collections.Generic;

namespace MyTeamTracker.Models
{
    public partial class Game
    {
        public Game()
        {
            this.TeamGameTasks = new List<TeamGameTask>();
        }

        public System.DateTime Time { get; set; }
        public int Team1Id { get; set; }
        public int Team2Id { get; set; }
        public int Id { get; set; }
        public virtual ICollection<TeamGameTask> TeamGameTasks { get; set; }
    }
}
