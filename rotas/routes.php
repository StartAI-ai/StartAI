<?php

use Slim\Http\Request;
use Slim\Http\Response;

return function ($app) {

    // Rota para criar um usuário
    $app->post('/usuarios', function (Request $request, Response $response, array $args) {
        $data = $request->getParsedBody();
        $nome = $data['nome'];
        $email = $data['email'];
        $senha = $data['senha'];
        $data_nasc = $data['data_nasc'];

        $result = $this->get('userService')->createUser($nome, $email, $senha, $data_nasc);

        if (isset($result['error'])) {
            return $response->withJson($result, 500);
        } else {
            return $response->withJson($result, 201);
        }
    });

    // Rota para listar todos os usuários
    $app->get('/usuarios', function (Request $request, Response $response, array $args) {
        $usuarios = $this->get('userService')->getUsers();
        return $response->withJson($usuarios);
    });

    // Rota para obter um usuário por ID
    $app->get('/usuarios/{id}', function (Request $request, Response $response, array $args) {
        $id = $args['id'];
        $usuario = $this->get('userService')->getUserById($id);

        if ($usuario) {
            return $response->withJson($usuario);
        } else {
            return $response->withJson(['error' => 'Usuário não encontrado'], 404);
        }
    });

    // Rota para atualizar um usuário
    $app->put('/usuarios/{id}', function (Request $request, Response $response, array $args) {
        $id = $args['id'];
        $data = $request->getParsedBody();
        $nome = $data['nome'];
        $email = $data['email'];
        $senha = $data['senha'];
        $data_nasc = $data['data_nasc'];

        $result = $this->get('userService')->updateUser($id, $nome, $email, $senha, $data_nasc);

        if (isset($result['error'])) {
            return $response->withJson($result, 500);
        } else {
            return $response->withJson($result);
        }
    });

    // Rota para excluir um usuário
    $app->delete('/usuarios/{id}', function (Request $request, Response $response, array $args) {
        $id = $args['id'];

        $result = $this->get('userService')->deleteUser($id);

        if (isset($result['error'])) {
            return $response->withJson($result, 500);
        } else {
            return $response->withJson($result);
        }
    });
};
