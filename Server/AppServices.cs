using System.Text;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;

namespace App.Server;

public static class AppServices
{
    /// <summary>
    /// Se agrega el servicio del identity y las opciones de la contraseña y bloqueo de la cuenta
    /// </summary>
    /// <param name="services"></param>
    public static void AddIdentity(this IServiceCollection services)
    {
        // services.AddDefaultIdentity<ApplicationUser>()
        //     .AddRoles<IdentityRole>()
        //     .AddEntityFrameworkStores<AppDbContext>()
        //     .AddTokenProvider<DataProtectorTokenProvider<ApplicationUser>>("FPS");

        services.Configure<IdentityOptions>(options =>
        {
            // Password settings.
            options.Password.RequireDigit = false;
            options.Password.RequireLowercase = false;
            options.Password.RequireNonAlphanumeric = false;
            options.Password.RequireUppercase = false;
            options.Password.RequiredLength = 6;
            options.Password.RequiredUniqueChars = 1;

            // Lockout settings.
            options.Lockout.DefaultLockoutTimeSpan = TimeSpan.FromDays(31);
            options.Lockout.MaxFailedAccessAttempts = 8;
            options.Lockout.AllowedForNewUsers = true;

            // User settings.
            options.User.AllowedUserNameCharacters =
                "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-._@+&$ ";
            options.User.RequireUniqueEmail = false;
        });
    }

    /// <summary>
    /// Creates the _configuration for JWT Authentication.
    /// </summary>
    /// <param name="services"></param>
    /// <param name="config"></param>
    public static void AddJwtAuthentication(this IServiceCollection services, IConfiguration config)
    {
        var secret = config["AppSettings:JwtSecret"];
        var key = Encoding.ASCII.GetBytes(secret!);

        services.AddAuthentication(opts =>
            {
                opts.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                opts.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            })
            .AddJwtBearer(opts =>
            {
                opts.RequireHttpsMetadata = false;
                opts.SaveToken = true;
                opts.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(key),
                    ValidateIssuer = false,
                    ValidateAudience = false
                };
            });
    }
}