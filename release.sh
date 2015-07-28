#!/usr/bin/env bash
printf "\n\n\nDo you wish to release to staging?\n\n"

select yn in "Yes" "No"; do
	case $yn in
		Yes )
			gulp sass

#			divshot login

            rm -r dist
            mkdir dist

			tar -v -cf open-maths-static.tar.gz css/ fonts/ images/ .gitignore bower.json gulpfile.js index.html package.json
            mv open-maths-static.tar.gz dist/open-maths-static.tar.gz

#			divshot push staging

#			printf "\n\n\nSuccessfully released to staging\n\n"
            printf "\n\n\nThis step has been temporarily skipped\n\n"

			break;;
		No )
			printf "\n\n\nOk, maybe next time :-)\n\n"
			break;;
	esac
done

printf "\n\n\nDo you wish to update production with latest staging release?\n\n"

select yn in "Yes" "No"; do
	case $yn in
		Yes )
#			divshot promote staging production

#			printf "\n\n\nSuccessfully released to production\n\n"
			printf "\n\n\nThis step has been temporarily skipped\n\n"

			break;;
		No )
			printf "\n\n\nOk, maybe next time :-)\n\n"
			exit;;
	esac
done