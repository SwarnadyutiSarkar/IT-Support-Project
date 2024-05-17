<?php
include 'db.php';

$stmt = $conn->prepare("SELECT * FROM documentation ORDER BY created_at DESC");
$stmt->execute();

$result = $stmt->fetchAll(PDO::FETCH_ASSOC);
echo json_encode($result);
?>
