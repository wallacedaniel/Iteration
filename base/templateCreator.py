#Wordwrap in IDLE

# OVERALL  PROCESS
# Choose small batch..run script..upload..(hold order? - only works keeping id's easily straight)
#..copy media data over..matching template copies
#..attach media/featured/title/categorize (draft?) paste body tags ...?
#  select image ...run script ..do media (orderly)..just title... paste body ?...?
#processing - style names
#  try > catch double named error

import os
import shutil
from datetime import date
import calendar
from time import time
    
def is_number(s):
    try:
        int(s)
        return True
    except ValueError:
        return False   

filesFolder = os.listdir()

date = date.today()
year = str(date.year)
month = str(date.month)
monthName = calendar.month_name[date.month]

if len(month) == 1:
    month = '0' + month

day = str(date.day)

if len(day) == 1:
    day = '0' + day

dateString = year + '/' + month + '/' + day + '/'
shortDateString =  year + '/' + month + '/' 

with open('templates.txt', 'w') as templates:

    namesArray = []

    for file in filesFolder:
 
        confirmed = False

        if file[len(file)-3:len(file)] == 'png':

            thisFile = file[:-4]

            # Remove Numbering
            while is_number(thisFile[len(thisFile)-1]):
                thisFile = thisFile[:-1]
                
            iterator = 0
            # Create New File Name                              
            while confirmed == False:
                fileString = thisFile
                print("     ")
                colorString = input('Colors for ' + file + " ")

                # Create String for File                                                     
                colorString = colorString.replace(" ", "-")
                fileString += "-" + colorString
                
                # Create Title and Links
                title = fileString.capitalize()
                title = list(title)
                
                for i in range(len(title)):
                    if title[i] == '-':
                        title[i+1] = title[i+1].upper()
                        
                title = ''.join(title)
                title = title.replace("-", " ")
                print("     ")
                check = input('Correct?  y  or  n ? :  ' + title + ' ')
                #if newArray "contains" not "is equal" title  >   add the iterater to the end
                # howmany times does new array "contain"?

                    #####    Enumerate   ## easy solution add each name to an array ..if any of the names in the array contain the input ..count how many
                #...add the next # to the end of the title and everything after  ...done
                duplicateCount = 0
                for name in namesArray:
                
                if title in namesArray[]: 
                        ####
                
                # iterator is + of how many times "contains"
                if check == 'y':
                    namesArray[iterator] = title
                    confirmed = True
                fileOut = fileString + ".png"
                os.rename(file, fileOut)
                shutil.move(fileOut, "finished/" + fileOut)
                iterator += 1


            link = dateString + fileString
            downloadLink = shortDateString + fileString

            #  Writes Wordpress template contents

            #Media
            templates.write('*********** MEDIA ***********' + '\n')
            templates.write('\n')

            #Title
            templates.write('\n')
            templates.write(title + '\n')
            templates.write('\n')
         
            #Caption
            templates.write('\n')
            if day[0] == '0':
                day = day.replace('0', '')
                
            captionString = thisFile.replace('iteration-', '')
            colorString = colorString.replace("-", " ")

            varString = ''

            if 'pattern' not in thisFile and 'landscape' not in thisFile:
                varString = 'pattern '
            
            caption = colorString + ' ' + captionString + ' ' + varString + monthName + ' ' + day + ', ' + year 
            templates.write(caption + '\n')
            templates.write('\n')

            #Alt Text          
            altText = 'iteration.gallery ' +  title.lower()
            altText = altText.replace('iteration ', '')
            templates.write('\n')
            templates.write(altText + ' ' + varString + '\n')
            templates.write('\n')
            templates.write('\n')
            
            #Body
            templates.write('*********** BODY ***********' + '\n')
            templates.write('\n')
            templates.write('[easy_media_download url="http://www.iteration.gallery/wp-content/uploads/' + downloadLink + '.png" text="Download" width="100" force_dl="1" color="grey_light" class="download"]')
            templates.write('\n')
            templates.write('[Sassy_Social_Share]' + '\n')
            templates.write('\n')
            templates.write('<p class="img-msg">Image format - PNG 6K x 4K     Broken link or incorrect download? <a href="http://www.iteration.gallery/contact/">Contact Us</a></p>' + '\n')
            templates.write('\n')
            templates.write(' <p class="license-info"><a href="http://creativecommons.org/licenses/by/4.0/" target="blank" rel="license"><img style="border-width: 0;" src="https://i.creativecommons.org/l/by/4.0/80x15.png" alt="Creative Commons License" /></a></p>' + '\n')
            templates.write('\n') 
            templates.write(title + ' by <a href="http://www.iteration.gallery/" rel="cc:attributionURL">Daniel Wallace</a> is licensed under a <a href="http://creativecommons.org/licenses/by/4.0/" target="blank" rel="license">Creative Commons Attribution 4.0 International License</a>. Based on a work at <a href="http://www.iteration.gallery/' + link + '/" rel="dct:source">http://www.iteration.gallery/' + link + '/</a>.' + '\n')
            templates.write('\n')
            
         

