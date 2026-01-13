# Downloads

This folder contains the installer files for Jisus:

- `Jisus-1.0.0-universal.dmg` (181 MB) - macOS Universal Binary
- `Jisus Setup 1.0.0.exe` (80.3 MB) - Windows Installer

**Note**: Due to GitHub's file size limitations, the actual installer files are not stored in this repository.

For production deployment, you should:

1. Upload the installer files to a cloud storage service (AWS S3, Google Cloud Storage, etc.)
2. Update the download links in the Downloads component to point to the hosted files
3. Or host them on your website's server directly

## Local Development

To test downloads locally, copy the installer files to this directory:

```bash
# Copy from the original projects
cp "../jisus-mac/release/Jisus-1.0.0-universal.dmg" ./
cp "../jisus-windows/release/Jisus Setup 1.0.0.exe" ./
```
