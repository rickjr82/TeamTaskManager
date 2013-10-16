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