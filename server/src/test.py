import sys

def test():
    return "Success!"

def echo(s):
    if s == "hello python!":
        return "hello typescript!"
    
def fileTest(s):
    if s == "./filepath":
        with open('./output.txt','w', encoding='utf-8') as file:
            file.write("roses are red\nviolets are blue")
            file.close()
    return 'output.txt'

if __name__ == "__main__":
    s = str(sys.argv[1])
    print(fileTest(s))
    sys.stdout.flush()