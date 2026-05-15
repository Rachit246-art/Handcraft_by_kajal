import sys

def check_brackets(filename):
    with open(filename, 'r', encoding='utf-8') as f:
        content = f.read()
    
    stack = []
    lines = content.split('\n')
    for i, line in enumerate(lines):
        for char in line:
            if char == '{':
                stack.append(('{', i + 1))
            elif char == '}':
                if not stack:
                    print(f"Extra closing bracket at line {i + 1}")
                    return False
                stack.pop()
    
    if stack:
        for bracket, line in stack:
            print(f"Unclosed open bracket at line {line}")
        return False
    
    print("Brackets are balanced.")
    return True

if __name__ == "__main__":
    check_brackets(sys.argv[1])
