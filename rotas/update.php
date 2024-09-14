<?php
include 'db.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $id = $_POST['id'];
    $nome = $_POST['nome'];
    $email = $_POST['email'];
    $senha = $_POST['senha'];
    $data_nasc = $_POST['data_nasc'];

    $stmt = $conn->prepare("UPDATE usuarios SET nome=?, email=?, senha=?, data_nasc=? WHERE id=?");
    $stmt->bind_param("ssssi", $nome, $email, $senha, $data_nasc, $id);

    if ($stmt->execute()) {
        echo "Usuário atualizado com sucesso!";
    } else {
        echo "Erro: " . $stmt->error;
    }

    $stmt->close();
    mysqli_close($conn);
} else {
    $id = $_GET['id'];
    $stmt = $conn->prepare("SELECT * FROM usuarios WHERE id=?");
    $stmt->bind_param("i", $id);
    $stmt->execute();
    $result = $stmt->get_result();
    $row = $result->fetch_assoc();
?>

<form method="post" action="">
    <input type="hidden" name="id" value="<?php echo $row['id']; ?>">
    Nome: <input type="text" name="nome" value="<?php echo $row['nome']; ?>" required><br>
    Email: <input type="email" name="email" value="<?php echo $row['email']; ?>" required><br>
    Senha: <input type="password" name="senha" value="<?php echo $row['senha']; ?>" required><br>
    Data de Nascimento: <input type="date" name="data_nasc" value="<?php echo $row['data_nasc']; ?>" required>
    <input type="submit" value="Atualizar">
</form>

<?php
    $stmt->close();
    mysqli_close($conn);
}
?>
