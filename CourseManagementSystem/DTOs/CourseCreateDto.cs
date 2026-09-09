using System.ComponentModel.DataAnnotations;

namespace CourseManagementSystem.DTOs
{
    public class CourseCreateDto
    {
        [Required]
        [MaxLength(200)]
        public string CourseName { get; set; } = null!;

        [Range(1, int.MaxValue, ErrorMessage = "Duration must be greater than 0")]
        public int DurationInHours { get; set; }

        [Range(0.01, double.MaxValue, ErrorMessage = "Fee must be greater than 0")]
        public decimal Fee { get; set; }
    }
}