SELECT `main`.`Chat`.`id`, `main`.`Chat`.`name`
FROM `main`.`Chat`
WHERE (`main`.`Chat`.`id`) IN (SELECT `t1`.`A`
                               FROM `main`.`_ChatToUser` AS `t1`
                                        INNER JOIN `main`.`User` AS `j1` ON (`j1`.`id`) = (`t1`.`B`)
                               WHERE (`j1`.`id` = ? AND `t1`.`A` IS NOT NULL)) LIMIT ?
OFFSET ?
