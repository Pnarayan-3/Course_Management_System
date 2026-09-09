using CourseManagementSystem.DTOs;

namespace CourseManagementSystem.Services
{
    public interface ICourseService
    {
        Task<IEnumerable<CourseReadDto>> GetAllAsync();
        Task<CourseReadDto?> GetByIdAsync(int id);
        Task<CourseReadDto> CreateAsync(CourseCreateDto dto);
        Task<bool> UpdateAsync(int id, CourseUpdateDto dto);
        Task<bool> DeleteAsync(int id);
    }
}