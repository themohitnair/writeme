import os
import sys
import mimetypes

IGNORE_FOLDERS = ['env', 'venv', '.venv', 'node_modules', '__pycache__', '.git']
IGNORE_EXTENSIONS = ['.pyc', '.pyo', '.dll', '.so', '.dylib', '.exe']

def read_file_contents(file_path):
    try:
        with open(file_path, 'r', encoding='utf-8') as file:
            return file.read()
    except UnicodeDecodeError:
        with open(file_path, 'r', encoding='latin-1') as file:
            return file.read()
    except Exception as e:
        print(f"Error reading file '{file_path}': {e}")
        return None

def is_text_file(file_path):
    mime_type, _ = mimetypes.guess_type(file_path)
    if mime_type is not None and mime_type.startswith('text'):
        return True
    return False

def should_ignore_folder(folder_name):
    return folder_name.lower() in IGNORE_FOLDERS

def should_ignore_file(file_name):
    _, file_extension = os.path.splitext(file_name)
    return file_extension.lower() in IGNORE_EXTENSIONS

def prepare_file_dictionary(root_path):
    file_dict = {}

    if os.path.isfile(root_path):
        file_contents = read_file_contents(root_path)
        if file_contents is not None:
            file_dict[root_path] = file_contents
    elif os.path.isdir(root_path):
        for root, dirs, files in os.walk(root_path):
            dirs[:] = [d for d in dirs if not should_ignore_folder(d)]
            for file_name in files:
                file_path = os.path.join(root, file_name)
                if should_ignore_file(file_name):
                    continue
                file_contents = read_file_contents(file_path)
                if file_contents is not None:
                    file_dict[file_path] = file_contents

    return file_dict

def main():
    cwd = os.getcwd()

    if len(sys.argv) > 1:
        rel_path = sys.argv[1]
        abs_path = os.path.join(cwd, rel_path)
        if not os.path.exists(abs_path):
            print(f"The provided path '{rel_path}' does not exist.")
            return
    else:
        print("Please provide a path to a file or directory.")
        return

    file_dict = prepare_file_dictionary(abs_path)

    # Display the dictionary
    print("Dictionary of Files and Contents:")
    for file_path, contents in file_dict.items():
        print(f"File Path: {file_path}")
        print("Contents:")
        print(contents)
        print("\n---\n")

if __name__ == "__main__":
    main()
