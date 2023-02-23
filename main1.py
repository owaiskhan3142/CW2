

from time import sleep
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium import webdriver
from webdriver_manager.chrome import ChromeDriverManager

# from mail import send_email

targetElectives = [('AI4005-Embedded Artificial Intelligence',"2260"),('CS4067-DevOps',"2153"),('CS4057-Agile Software Project Management',"1164"),('MG4011-Entrepreneurship',"1708")]
refreshRate = 1

driver = webdriver.Chrome(ChromeDriverManager().install())


driver.implicitly_wait(0.5)
#launch URL
driver.get("https://flexstudent.nu.edu.pk/Login")


sleep(10)

l = driver.find_element(by=By.ID,value='m_login_signin_submit')
l.click()

sleep(1)



#send_email("BOT Started", "The bot code is running")

while(1):

    l = driver.find_element(by=By.LINK_TEXT, value="Home").click()
    # sleep(refreshRate)
    l = driver.find_element(by=By.LINK_TEXT, value="Course Registration").click()
    sleep(refreshRate)

    if len(targetElectives[0]) == 0:
        #send_email("Stopped", "all courses registered")
        exit(0)

    # driver.refresh()
    rows = driver.find_elements(By.TAG_NAME, "tr") 

    def drop_current_elective():
        rows = driver.find_elements(By.TAG_NAME, "tr") 
        for row in rows:
           
            try:     
                course = row.find_element(By.NAME, "CourseId")

                if (course.text == currentElective):
                            c = row.find_element(By.TAG_NAME, "button")
                            c.click()
                            print('Current ELECTIVE Dropped')
                            driver.switchTo().alert().accept()

                            break

            except:
                continue


    # for row in rows:
        

    for i in range(0, len(targetElectives)):

        targetElective, c_id = targetElectives[i]

        try:    
            course = driver.find_element(By.NAME, "CourseId")
           
                

            # if (course.text == targetElective):
            
                
            c = driver.find_element(By.NAME, "RegisterChkbox")
           

            if c:
                    # print('ELECTIVE AVAILABLE')

                    # drop_current_elective()        ############### to replace elective


                    c = driver.find_element(By.ID, c_id)
                    c.click()

                    x = driver.find_element(By.ID, "submit")
                    sleep(2)
                    x.click()

                    print(targetElective + ' ELECTIVE AVAILABLE')
        
                    print("clicked")
                    driver.switch_to.alert.accept()
                    sleep(2)

                    targetElectives.remove(targetElectives[i])

                    #send_email("Course registered", targetElective + "is registered")
                    break
                

            


            else:
                print('\n\n\n',course.text,"       STATUS :      Elective NA")
                # sleep(refreshRate)
            
                break
        

        except:

            continue
        

        

        