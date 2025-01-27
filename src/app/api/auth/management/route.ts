// app/api/management/route.ts
import { NextResponse, NextRequest } from "next/server";

const AUTH0_DOMAIN = process.env.AUTH0_ISSUER_BASE_URL;
const AUTH0_CLIENT_ID = process.env.AUTH0_CLIENT_ID;
const AUTH0_CLIENT_SECRET = process.env.AUTH0_CLIENT_SECRET;
const AUTH0_AUDIENCE = process.env.AUTH0_AUDIENCE;

// Função para obter o token de acesso da Auth0 Management API
async function getManagementAccessToken(): Promise<string> {
  try {
    //  requisição com fetch
    const response = await fetch(`${AUTH0_DOMAIN}/oauth/token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        client_id: AUTH0_CLIENT_ID,
        client_secret: AUTH0_CLIENT_SECRET,
        audience: AUTH0_AUDIENCE,
        grant_type: "client_credentials",
      }),
    });

    const data = await response.json();
    return data.access_token;
  } catch (error) {
    console.error("Erro ao obter o token de acesso:", error);
    throw new Error("Erro ao obter o token de acesso");
  }
}

// Handler para obter `user_metadata` do usuário
export async function GET(request: NextRequest) {
  // Acessando o parâmetro userId de forma segura
  const userId = request.nextUrl.searchParams.get("userId");
  const id_project = request.nextUrl.searchParams.get("id_project");

  if (!userId && !id_project) {
    return NextResponse.json(
      { error: "User ID and Project ID are required" },
      { status: 400 }
    );
  }

  try {
    const token = await getManagementAccessToken();
    const response = await fetch(`${AUTH0_DOMAIN}/api/v2/users/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: "Failed to fetch user data" },
        { status: response.status }
      );
    }

    const data = await response.json();

    const user_data = {
      id_person: data.user_id,
      name: data.username || data.name,
      email: data.email,
      // picture: data.picture,
      phone_number: data.phone_number,
      role: data.user_metadata?.tipo_cargo,
    };

    return NextResponse.json(user_data);
  } catch (error) {
    console.error("Erro ao obter metadados do usuário:", error);
    return NextResponse.json(
      { error: "Failed to fetch user metadata" },
      { status: 500 }
    );
  }
}

// Atualizar o `user_metadata` do usuário
export async function PUT(request: NextRequest) {
  const userId = request.nextUrl.searchParams.get("userId");

  if (!userId) {
    return NextResponse.json({ error: "User ID is required" }, { status: 400 });
  }

  const body = await request.json();

  try {
    const token = await getManagementAccessToken();
    // Verificar se user_metadata já existe
    const responseUser = await fetch(`${AUTH0_DOMAIN}/api/v2/users/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!responseUser.ok) {
      return NextResponse.json(
        { error: "Failed to fetch user data" },
        { status: responseUser.status }
      );
    }
    const dataUser = await responseUser.json();
    const user_metadata = dataUser.user_metadata || {};
    const new_user_metadata = { ...user_metadata, ...body };

    const response = await fetch(`${AUTH0_DOMAIN}/api/v2/users/${userId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        user_metadata: new_user_metadata,
      }),
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: "Failed to update user metadata" },
        { status: response.status }
      );
    }

    const data = await response.json();

    const user_data = {
      id_pessoa: data.user_id,
      nome: data.username || data.name,
      email: data.email,
      // picture: data.picture,
      numero: data.phone_number,
      tipo: data.user_metadata?.tipo_cargo || "cliente",
    };

    console.log(user_data);

    return NextResponse.json(user_data);
  } catch (error) {
    console.error("Erro ao atualizar metadados do usuário:", error);
    return NextResponse.json(
      { error: "Failed to update user metadata" },
      { status: 500 }
    );
  }
}

// Excluir o `user_metadata` do usuário
export async function DELETE(request: NextRequest) {
  const userId = request.nextUrl.searchParams.get("userId");

  if (!userId) {
    return NextResponse.json({ error: "User ID is required" }, { status: 400 });
  }

  try {
    const token = await getManagementAccessToken();
    const response = await fetch(`${AUTH0_DOMAIN}/api/v2/users/${userId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        user_metadata: {},
      }),
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: "Failed to delete user metadata" },
        { status: response.status }
      );
    }

    return NextResponse.json({ message: "User metadata deleted successfully" });
  } catch (error) {
    console.error("Erro ao excluir metadados do usuário:", error);
    return NextResponse.json(
      { error: "Failed to delete user metadata" },
      { status: 500 }
    );
  }
}
