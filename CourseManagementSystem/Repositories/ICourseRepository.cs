using CourseManagementSystem.Models;

namespace CourseManagementSystem.Repositories
{
    public interface ICourseRepository
    {
        Task<IEnumerable<Course>> GetAllAsync();
        Task<Course?> GetByIdAsync(int id);
        Task AddAsync(Course course);
        void Update(Course course);
        void Delete(Course course);
        Task SaveChangesAsync();
    }
}