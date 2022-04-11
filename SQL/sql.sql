-- SELECT * FROM students;

-- select * from students where age = 15;

-- select * from students where name = 'dima';

-- select name from students;

-- select * from students where name like 'o%';

-- select * from students where name like '%a';

-- select * from students where name like 'r%n';

-- select * from students where name like '___a%';

-- select * from students order by age desc;

-- select * from students where gender like 'f%' order by name;

-- select * from students where id >= 4 order by age;

-- select * from students where id >3 and gender like 'm%' order by age;

-- select * from students where age <= 20 or gender like 'f%' order by age;

select * from students order by age asc, name desc;

-- select * from students where age between 10 and 35;
-- select * from students where age >= 10 and age <= 35;

-- select * from students where age = 18 or age = 31;
-- select * from students where age in (18, 31);

select min(age) from students;
select max(age) from students;
select avg(age) from students;

select count(age) from students where age = 31;

select sum(age) from students;

select avg(rating) as avgRat,
	count(rating) as countRat
    from ratings
    where student_id = 5;
    
select * from students limit 3 offset 0;

