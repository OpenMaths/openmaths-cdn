# openmaths-cdn

Web app dependencies

### Release process:

    # After gcloud has been configured
    gsutil rsync -R dist gs://static.openmaths.io

    gsutil web set -m index.html gs://static.openmaths.io
    # @TODO gsutil web set -e 404.html gs://static.openmaths.io

    gsutil acl set public-read gs://static.openmaths.io
    gsutil -m acl set -R -a public-read gs://static.openmaths.io