XAMPP Custom Domain Configuration
A step-by-step guide to configuring a custom local domain (e.g., `mysite.local`) for your XAMPP projects on Windows.

Prerequisites
• XAMPP installed and running.

• Administrator access to edit system files.

• A text editor (Notepad, VS Code, etc.).

Installation Steps
1. Map the Domain in Windows Hosts File

1. Navigate to: `C:\Windows\System32\drivers\etc\`

2. Open the `hosts` file as Administrator.

3. Add the following line to the bottom of the file:

```

127.0.0.1       mysite.local

```

4. Save and close.

2. Enable Virtual Hosts in Apache

1. Navigate to: `C:\xampp\apache\conf\`

2. Open `httpd.conf`.

3. Search for `httpd-vhosts.conf`.

4. Uncomment the include line by removing the `#`:

```

# Before:

#Include conf/extra/httpd-vhosts.conf

# After:

Include conf/extra/httpd-vhosts.conf

```

5. Save and close.

3. Configure Virtual Hosts

1. Navigate to: `C:\xampp\apache\conf\extra\`

2. Open `httpd-vhosts.conf`.

3. Append the following configuration to the end of the file. This ensures `localhost` still works while adding your new domain.

```

# Default localhost configuration

<VirtualHost *:80>

    DocumentRoot "C:/xampp/htdocs"

    ServerName localhost

</VirtualHost>

# Custom Domain Configuration

<VirtualHost *:80>

    DocumentRoot "C:/xampp/htdocs/myproject"

    ServerName mysite.local

    <Directory "C:/xampp/htdocs/myproject">

        Options Indexes FollowSymLinks

        AllowOverride All

        Require all granted

    </Directory>

</VirtualHost>

```

Note: Replace `C:/xampp/htdocs/myproject` with your actual project path.

4. Restart Apache

1. Open the XAMPP Control Panel.

2. Click Stop on the Apache module.

3. Click Start to restart it.

Usage
Open your web browser and navigate to: `http://mysite.local`

Troubleshooting
• 403 Forbidden: Ensure the `<Directory>` permissions are set correctly in `httpd-vhosts.conf`.

• Site not found: Verify the entry in the `hosts` file and that you saved as Administrator.

• Apache won't start: Check for syntax errors in the config files. Use `C:\xampp\apache\bin\httpd -t` in the command line to test syntax.
