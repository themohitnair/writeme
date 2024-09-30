import requests
import base64
import chardet

def get_repo_files(username, repo, branch='main'):
    tree_url = f'https://api.github.com/repos/{username}/{repo}/git/trees/{branch}?recursive=1'
    tree_response = requests.get(tree_url)
    
    if tree_response.status_code != 200:
        print(f"Failed to retrieve repository tree: {tree_response.status_code}")
        return {}
    
    files = tree_response.json().get('tree', [])
    
    file_contents = {}
    
    for file in files:
        if file['type'] == 'blob': 
            file_url = f'https://api.github.com/repos/{username}/{repo}/git/blobs/{file["sha"]}'
            file_response = requests.get(file_url)
            
            if file_response.status_code == 200:
                file_data = file_response.json()
                try:
                    # Detect the encoding
                    raw_data = base64.b64decode(file_data['content'])
                    result = chardet.detect(raw_data)
                    encoding = result['encoding']
                    
                    if encoding:
                        content = raw_data.decode(encoding)
                        file_contents[file['path']] = content
                    else:
                        print(f"Could not determine encoding for {file['path']}. Skipping.")
                except (UnicodeDecodeError, base64.binascii.Error) as e:
                    print(f"Failed to decode content for {file['path']}. Skipping. Error: {e}")
            else:
                print(f"Failed to retrieve content for {file['path']}: {file_response.status_code}")
    
    return file_contents

if __name__ == "__main__":
    username = input("Enter the GitHub username: ")
    repo = input("Enter the repository name: ")
    branch = input("Enter the branch (default is 'main'): ") or 'main'

    file_dict = get_repo_files(username, repo, branch)

    if file_dict:
        for path, content in file_dict.items():
            print(f'Path: {path}\nContent:\n{content}\n{"-"*60}\n')
    else:
        print("Failed to retrieve repository data.")