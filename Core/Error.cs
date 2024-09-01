namespace App.Core;

public record Error(string Code, string Description)
{
    public static Error None => new(string.Empty, string.Empty);
}