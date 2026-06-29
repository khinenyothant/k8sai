# Kubernetes Troubleshooting

## CrashLoopBackOff
- Check application logs: kubectl logs <pod-name>
- Common causes: wrong image, config error, resource limits

## ImagePullBackOff
- Check image name and tag
- Verify registry credentials