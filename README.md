For some reason I had issues submitting but i realized a link could do the same thing.
The following is my R Markup file in text which can be copied and pasted into your desired RStudio and ran. /n
Alternativly you can download using the link below

<a href="proj-4.Rmd">R Markup Download</a>
<a href="proj-4.html">Html Download</a>



---
title: "Project 4"
author: "Tyrese Walker"
date: "2025-01-15"
output: html_document
---

```{r setup, include=FALSE}
knitr::opts_chunk$set(echo = TRUE)
```

## Introduction

For this project, you will look at the relationship between changes in temperature and oceanic storms. You will need to load the following libraries to complete the assignment.

```{r message=FALSE, warning=FALSE}

library(dplyr)
library(ggplot2)
library(tidyr)
```

2 data sets are used. The data set containing temperatures is named "temperature.csv" and can be found in Canvas inside of the Data folder in Files. Download the data set, then load it using the `read.csv` function. 

*(Hint: You can use the "Import Dataset > From Text (base)" command in the "File" menu to search for the downloaded file. Then, copy and paste the command from the console below.)*

```{r}
file.exists("temperature.csv")
temperature <- read.csv("temperature.csv")

#change as needed ^



```

The data set contains 142 rows corresponding to each year from 1880-2021. It contains 13 columns -- the year of the observation and 12 months. Each value represents the temperature anomaly for the month in the North Hemisphere.

The data set containing information on each storm can be found in the `dplyr` library. It will be used for questions 4 and 5. Load it using the following command.

```{r}
data(storms)

```

`storms` contains 11,859 observations of oceanic storms in the Atlantic. Each observation is a measurement of the storm, taken every 6 hours. The data set contains the name of the storm, the date & time, longitude & latitude, category, wind speed & pressure, and diameter.


## 1. Summarizing Temperature Anomalies

Use the `pivot_longer(...)` command from the `tidyr` package to shrink the number of columns in the `temperature` data.frame to 3 -- the Year, Month, and Temperature.

*(See Section 4.3)*

----------

```{r}
temps_year = pivot_longer(
  temperature,
  -Year,
  names_to  = "Month",
  values_to = "Temps",
  
  )

temps_year

```


## 2. Average Temperature

Calculate the average temperature anomaly for each year. Then, plot the temperature anomaly across time *(line plot)* using `ggplot`, including a smooth trend line.

Discuss what is happening to average temperatures across time.

*(See Section 4.2 for summarizing data & 3. Application for an example line plot. For the trend line, use `geom_smooth()`. Don't worry about adding `method="lm"`.)*

----------

```{r}
## PLACE SUMMARY CODE HERE (do the math here)

Dis_year = pivot_longer(
  temperature,
  -Year,
  names_to  = "Month",
  values_to = "Temps")


line_data = Dis_year %>%
  group_by(Year) %>%
  summarize(Temperature = mean(Temps, na.rm = TRUE))

line_data
  


#  summarize(Average_Temperature = mean(temperature))
  

  
  



#yearly_avg
#summary mean where year =


```





```{r message=FALSE, warning=FALSE}
## PLACE PLOT CODE HERE ( do the charting here)

ggplot(Dis_year, aes(x = Year, y = Temps)) +
geom_point()+
geom_smooth(color = "red")

```

The temperatures overall trend at an increase, though they don't always over the course of the recorded time


## 3. Linear Regression

Perform a linear regression with `Year` as the independent $(x)$ variable and `Temperature` as the dependent $(y)$ variable. Show the summary and discuss the relationship.

Plot the residuals from the regression. Do you observe any patterns?

*(See Section 4.4-5 for linear regression examples and plotting residuals. If you use `ggplot` for the residual plot, you will want to place the residuals & fitted values into a new data.frame first.)*

----------

```{r}
## PLACE REGRESSION CODE HERE
regression = lm(Temps ~ Year, data = Dis_year)
  
summary(regression)
```

DISCUSS REGRESSION HERE

With pretty good statistical certainty we expect the temperature to increase as the years go on

```{r}
## PLACE RESIDUAL PLOT CODE HERE
plot(regression$residuals)
```

DISCUSS RESIDUALS HERE

Although the residuals themselves are slightly scattered they follow the form of the original data and the regression line. They even start to form their own informal regression line. Places where the above plot showed temp decreases the residuals are below 0 and temp increase has residuals above 0. Since most are above 0 temps have risen since the start of data collection. 

## 4. Cleaning Storms

Restrict the number of variables in the `storms` data set to the following: `name`, `year`, `category`, and `wind`. Rename the `year` column to `Year` *(capitalize)* so that it is consistent with the `Temperature` data set. Convert the "category" column to a number using the `as.numeric` function. 

Finally, group the data set by the name of the storm and summarize the data. Let `Year` be the starting year of the storm, `category` is the highest category, `wind` is the average wind speed, and `duration` is the number of observations associated with each storm.

What happened to the "category" column when it was converted to a number? How can you correct it?

*(See Section 4.1 for cleaning the data & 4.2 for summarizing it. You can use `levels(x)` to see the different categories of categorical variable `x`.)*

----------


```{r}
## PLACE CODE HERE

#1 restrict storms to name, year, category, and wind
#2 rename year to Year
#3 convert category to numbers using as.numeric

#4 group by name and summarize the data
#5 Year = starting year, Category = highest category, Wind = avg wind speed, Duration = number of observations of each storm


Storm_data = storms %>% select(name,Year=year,category,wind) %>% #1 & 2
mutate(category = as.numeric(category))%>% #3 
group_by(name) #4

sd_summary = summarize(Storm_data,
  Year = min(Year),
  category = max(category),
  wind = mean(wind, na.rm = TRUE),
  duration = n()
  )  #5

Storm_data
sd_summary

```

DISCUSS HERE

The NAs in the category section stayed as NAs since they are basically null values so nothing can really be done with them. You could attempt to find anywhere where the storms are actually categorized and copy it to all other measurements or assign certain categories to a given wind speed range though you may have issues if the wind speed isnt included in the scale

## 5. Combining Data

Trim the temperature data set created in question 2, then join it to the storms data set created in question 4 by the year. Perform 2 linear regressions. The first regression should have `category` as the $(y)$ variable and `Temperature` as the $(x)$ variable. The second regression should *also* include `wind` and `duration` as $(x)$ variables.

Discuss the relationships.

*(See Section 4.3 on joining data sets & Sections 4.4-5 for linear regression.)*

----------

```{r}
## PLACE FILTERING & JOINING CODE HERE
Dis_year_NM <- Dis_year %>% select(-Month)


combined_data = Dis_year_NM %>%
  inner_join(Storm_data, by = "Year") # Join the 2 main sets

combined_data = combined_data %>%
  left_join(sd_summary, by = "name") #add duration

combined_data = combined_data %>% select(-Year.y,-category.y,-wind.y) #remove repeats 

combined_data = combined_data %>%
  rename(
    Year = Year.x,
    category = category.x,
    wind = wind.x
  ) # rename back to original

combined_data

```

```{r}
## PLACE REGRESSION 1 CODE HERE
#y=category
#x=Temps


 reg_temps_cat_line = lm(category ~ Temps, data = combined_data)
 reg_temps_cat = summary(reg_temps_cat_line)
 reg_temps_cat
 plot(reg_temps_cat_line)

```

DISCUSS REGRESSION 1 HERE

The categories of the storms increase with temperature though at a very small rate

```{r}
## PLACE REGRESSION 2 CODE HERE
#wind and duration

 reg_win_dur_line <- lm(category ~ Temps + wind + duration, data = combined_data)
 reg_win_dur = summary(reg_win_dur_line)
 reg_win_dur
 plot(reg_win_dur_line)
```

DISCUSS REGRESSION 2 HERE
There are more things changing due to the other variables introduced, with the other variables heat is not the only factor in deciding category as wind is much more significant


