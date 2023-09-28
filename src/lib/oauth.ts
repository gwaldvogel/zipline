export const github_auth = {
  oauth_url: (clientId: string, state?: string) =>
    `https://github.com/login/oauth/authorize?client_id=${clientId}&scope=read:user${
      state ? `&state=${state}` : ''
    }`,
  oauth_user: async (access_token: string) => {
    const res = await fetch('https://api.github.com/user', {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });
    if (!res.ok) return null;

    return res.json();
  },
};

export const discord_auth = {
  oauth_url: (clientId: string, origin: string, state?: string, redirect_uri?: string) =>
    `https://discord.com/api/oauth2/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(
      redirect_uri || `${origin}/api/auth/oauth/discord`
    )}&response_type=code&scope=identify${state ? `&state=${state}` : ''}`,
  oauth_user: async (access_token: string) => {
    const res = await fetch('https://discord.com/api/users/@me', {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });
    if (!res.ok) return null;

    return res.json();
  },
};

export const google_auth = {
  oauth_url: (clientId: string, origin: string, state?: string, redirect_uri?: string) =>
    `https://accounts.google.com/o/oauth2/auth?client_id=${clientId}&redirect_uri=${encodeURIComponent(
      redirect_uri || `${origin}/api/auth/oauth/google`
    )}&response_type=code&access_type=offline&scope=https://www.googleapis.com/auth/userinfo.profile${
      state ? `&state=${state}` : ''
    }`,
  oauth_user: async (access_token: string) => {
    const res = await fetch(
      `https://people.googleapis.com/v1/people/me?access_token=${access_token}&personFields=names,photos`
    );
    if (!res.ok) return null;

    return res.json();
  },
};

export const oidc_auth = {
  oauth_url: (authorizeUrl: string, clientId: string, origin: string, scope: string, state?: string) =>
    `${authorizeUrl}?client_id=${clientId}&redirect_uri=${encodeURIComponent(
      `${origin}/api/auth/oauth/oidc`
    )}&response_type=code&access_type=offline&scope=${scope}${state ? `&state=${state}` : ''}`,
  oauth_user: async (userinfoUrl: string, access_token: string) => {
    const res = await fetch(`${userinfoUrl}`, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });
    console.log('userinfo', res);
    if (!res.ok) return null;

    return res.json();
  },
};
