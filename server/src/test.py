import sys

def test():
    return "Success!"

def echo(s):
    if s == "hello python!":
        return "hello typescript!"

if __name__ == "__main__":
    s = str(sys.argv[1])
    print(echo(s))
    sys.stdout.flush()