# 使用selenium, 通过调用浏览器驱动的方式，操作浏览器
from selenium import webdriver
# from selenium.webdriver.common.by import By
# from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import WebDriverWait
# from selenium.webdriver.support.expected_conditions import presence_of_element_located
from selenium.webdriver.chrome.options import Options
import time

# 一切都是按照w3c的webdriver标准来实现的
# https://www.w3.org/TR/webdriver1/

# chrome 浏览器配置, 保持detach状态，浏览器不会自动关闭
option = Options()
option.add_experimental_option("detach", True)
option.add_experimental_option('useAutomationExtension', False)
option.add_experimental_option('excludeSwitches', ['enable-automation'])

try:
    with webdriver.Chrome(executable_path="./chromedriver", options=option) as driver:
        wait = WebDriverWait(driver, 10)
        # 模拟打开页面(因为是基于 webdriver的，所以可以实现chrome 正在受到自动软件控制)
        driver.get('https://car.ctrip.com/airport-transfers/index')

        input_selector = driver.find_element_by_css_selector('.flight-content .thanos-input-container input')
        # 如果不使用chrome driver，而是采用js注入的方式的话，会受到浏览器安全限制，从而无法点击input 等元素
        input_selector.click()
        time.sleep(3)
        li_selector = driver.find_element_by_css_selector('.month__item.normal:nth-of-type(5)')
        li_selector.click()
        time.sleep(5)

except Exception as error:
    print(error)


